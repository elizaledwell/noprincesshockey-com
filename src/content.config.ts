import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

const reviews = defineCollection({
	loader: glob({ base: './src/content/reviews', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		brand: z.string(),
		productName: z.string(),
		category: z.enum(['skates', 'gloves', 'chest-protector', 'pants', 'base-layer', 'stick', 'helmet', 'other']),
		rating: z.number().min(1).max(5),
		price: z.string().optional(),
		affiliateLink: z.string().url().optional(),
		pubDate: z.coerce.date(),
		pros: z.array(z.string()),
		cons: z.array(z.string()),
		summary: z.string(),
	}),
});

export const collections = { blog, reviews };
