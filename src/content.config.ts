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
			// Beta-testing CTA (renders the TestFlight alert + enrollment form at the top of the page).
			beta: z.boolean().default(false),
			testflightUrl: z.string().optional(),
			androidTestUrl: z.string().optional(),
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
};
