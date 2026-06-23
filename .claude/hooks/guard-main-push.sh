#!/usr/bin/env bash
# PreToolUse(Bash) guard for this repo.
#
# A push to `main` triggers the production deploy workflow
# (.github/workflows/deploy.yml → build + rsync to the server). Per CLAUDE.md,
# pushing `main` must never happen without the maintainer's explicit, in-the-
# moment permission. This hook forces a confirmation prompt ("ask") before any
# `git push` that would update `main`. It does NOT block feature-branch pushes.
#
# Decision contract: print a PreToolUse hookSpecificOutput JSON with
# permissionDecision "ask" to require confirmation; exit 0 with no output to allow.

input=$(cat)

cmd=$(printf '%s' "$input" | python3 -c 'import sys, json
try:
    print(json.load(sys.stdin).get("tool_input", {}).get("command", ""))
except Exception:
    print("")' 2>/dev/null)

# Not a git push → allow.
printf '%s\n' "$cmd" | grep -Eq '(^|[;&|]|[[:space:]])git[[:space:]]+push([[:space:]]|;|&|\||$)' || exit 0

needs_ask=0
# Push that names `main` as a ref from any branch (e.g. `git push origin main`,
# `git push origin HEAD:main`, or `git checkout main && git push`).
printf '%s\n' "$cmd" | grep -Eq '\bmain\b' && needs_ask=1
# Bare push while the current branch IS main (no explicit ref in the command).
if [ "$needs_ask" -eq 0 ]; then
  branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
  [ "$branch" = "main" ] && needs_ask=1
fi

[ "$needs_ask" -eq 0 ] && exit 0

reason="This 'git push' would update main, which triggers the production deploy (.github/workflows/deploy.yml). Per CLAUDE.md, only proceed if the maintainer has explicitly approved deploying this change right now."
python3 -c 'import json, sys
print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "ask", "permissionDecisionReason": sys.argv[1]}}))' "$reason"
exit 0
