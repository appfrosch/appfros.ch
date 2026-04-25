// @ts-check
import { defineConfig } from 'astro/config';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { visit } from 'unist-util-visit';

function rehypeCleanHeadingIds() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (/^h[1-6]$/.test(node.tagName) && node.properties?.id) {
				node.properties.id = node.properties.id
					.replace(/[^\w-]/g, '')
					.replace(/-+/g, '-')
					.replace(/^-|-$/g, '');
			}
		});
	};
}

// https://astro.build/config
export default defineConfig({
	markdown: {
		rehypePlugins: [
			rehypeSlug,
			rehypeCleanHeadingIds,
			[rehypeAutolinkHeadings, { behavior: 'append', properties: { className: ['anchor-link'], ariaHidden: true, tabIndex: -1 }, content: { type: 'text', value: '#' } }],
		],
	},
});
