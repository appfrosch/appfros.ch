// Central i18n configuration and UI-string dictionary.
//
// The site is path-based: English lives at `/`, German at `/de/`. Content lives in
// per-locale subfolders (e.g. `src/content/work/en`, `src/content/work/de`), so a
// collection entry's `id` is prefixed with its locale (`en/Maexle`, `de/Maexle`).
// Slugs are identical across locales, which is why the language switcher can simply
// add/remove the `/de` prefix on the current URL.

export const languages = {
	en: 'EN',
	de: 'DE',
} as const;

export const defaultLang: Lang = 'en';

export type Lang = keyof typeof languages;

/** UI chrome strings. Markdown content is translated in the content collections, not here. */
export const ui = {
	en: {
		'nav.home': 'Home',
		'nav.apps': 'Apps',
		'nav.blog': 'Blog',
		'nav.about': 'About',
		'nav.switchTo': 'Auf Deutsch ansehen',

		'home.lookApps': 'Have a look at the apps I am working on.',
		'home.apps.heading': 'Apps',
		'home.apps.lead': 'Take a look below at my work.',
		'home.apps.viewAll': 'View All',
		'home.role.developer': 'Indy Developer',
		'home.role.dabbler': 'Code Dabbler',
		'home.role.rabbit': 'Rabbit Hole Examiner',
		'home.tagline': 'iOS/macOS Indy Development',

		'work.tagline': 'These are the projects I am currently working on.',
		'work.metaDescription': 'Learn about my most recent projects',
		'work.backLink': 'Apps',

		'blog.tagline': 'Thoughts on development, indie apps, and the journey.',
		'blog.metaDescription': 'Thoughts on development, indie apps, and the journey.',
		'blog.backLink': 'Blog',

		'notFound.title': 'Page Not Found',
		'notFound.tagline': 'Not found',
		'notFound.metaDescription': '404 Error — this page was not found',

		'footer.builtWith': 'Designed & Developed with',
	},
	de: {
		'nav.home': 'Start',
		'nav.apps': 'Apps',
		'nav.blog': 'Blog',
		'nav.about': 'Über mich',
		'nav.switchTo': 'View in English',

		'home.lookApps': 'Wirf einen Blick auf die Apps, an denen ich arbeite.',
		'home.apps.heading': 'Apps',
		'home.apps.lead': 'Sieh dir unten meine Arbeiten an.',
		'home.apps.viewAll': 'Alle ansehen',
		'home.role.developer': 'Indie-Entwickler',
		'home.role.dabbler': 'Code-Bastler',
		'home.role.rabbit': 'Kaninchenbau-Erforscher',
		'home.tagline': 'iOS/macOS Indie-Entwicklung',

		'work.tagline': 'Das sind die Projekte, an denen ich gerade arbeite.',
		'work.metaDescription': 'Erfahre mehr über meine aktuellen Projekte',
		'work.backLink': 'Apps',

		'blog.tagline': 'Gedanken über Entwicklung, Indie-Apps und den Weg dahin.',
		'blog.metaDescription': 'Gedanken über Entwicklung, Indie-Apps und den Weg dahin.',
		'blog.backLink': 'Blog',

		'notFound.title': 'Seite nicht gefunden',
		'notFound.tagline': 'Nicht gefunden',
		'notFound.metaDescription': '404-Fehler — diese Seite wurde nicht gefunden',

		'footer.builtWith': 'Gestaltet & entwickelt mit',
	},
} as const;

export type UIKey = keyof (typeof ui)['en'];

/** Derive the active locale from the request URL (first path segment). */
export function getLangFromUrl(url: URL): Lang {
	const [, seg] = url.pathname.split('/');
	return seg === 'de' ? 'de' : 'en';
}

/** Returns a `t('key')` lookup bound to a locale, falling back to the default language. */
export function useTranslations(lang: Lang) {
	return function t(key: UIKey): string {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}

/** Strip the `/de` locale prefix → the canonical (English) path. */
export function stripLocale(pathname: string): string {
	const stripped = pathname.replace(/^\/de(?=\/|$)/, '');
	return stripped === '' ? '/' : stripped;
}

/** Build the path for `pathname` under a given locale. Used by nav links and the switcher. */
export function toLocalePath(pathname: string, lang: Lang): string {
	const base = stripLocale(pathname);
	if (lang === 'de') return base === '/' ? '/de/' : `/de${base}`;
	return base;
}

/** The locale folder a collection entry belongs to, taken from its `id` prefix. */
export function localeOf(id: string): Lang {
	return id.startsWith('de/') ? 'de' : 'en';
}

/** A collection entry's locale-independent slug (its `id` minus the locale folder). */
export function slugOf(id: string): string {
	return id.replace(/^(en|de)\//, '');
}
