import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
	work: defineCollection({
		loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional(),
			draft: z.boolean().default(false),
			// Beta-testing CTA (renders the TestFlight alert + email signup at the top of the page).
			beta: z.boolean().default(false),
		}),
	}),
	blog: defineCollection({
		loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()).optional(),
		}),
	}),
	pages: defineCollection({
		loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			tagline: z.string(),
			description: z.string(),
		}),
	}),
};
