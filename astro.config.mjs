// @ts-check
import { defineConfig } from 'astro/config';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
	markdown: {
		rehypePlugins: [
			rehypeSlug,
			[rehypeAutolinkHeadings, { behavior: 'append', properties: { className: ['anchor-link'], ariaHidden: true, tabIndex: -1 }, content: { type: 'text', value: '#' } }],
		],
	},
});
