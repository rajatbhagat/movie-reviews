import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Reviews live in src/content/reviews/ as markdown files.
// To add a review: drop a .md file there with the frontmatter below.
// To add a new genre: just use a new value in `genres` — the genre pages and
// the filter pills are generated automatically from whatever genres exist.
const reviews = defineCollection({
  // Files starting with `_` (e.g. _template.md) are skipped entirely.
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    director: z.string(),
    /** Out of 10. Decimals are fine (7.5). */
    rating: z.number().min(0).max(10),
    genres: z.array(z.string()).default([]),
    /** One-line take, shown on cards and in search results. */
    description: z.string(),
    watchedDate: z.coerce.date(),
    /** Drafts are excluded from every page, the RSS feed, and the sitemap. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { reviews };
