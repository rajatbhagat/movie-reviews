import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Reviews live in src/content/reviews/ as markdown files.
// To add a review: drop a .md file there with the frontmatter below.
// To add a new genre: just use a new value in `genres` — the genre pages and
// the filter pills are generated automatically from whatever genres exist.
const reviews = defineCollection({
  // Files starting with `_` (e.g. _template.md) are skipped entirely.
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/reviews' }),
  // Reviews are text only — no posters, stills, or thumbnails anywhere. Film
  // artwork is studio-owned and there is no licence that makes it safe to
  // republish, so the site does not carry any.
  schema: z.object({
    title: z.string(),
    year: z.number(),
    director: z.string(),
    /** Out of 5. Decimals are fine (3.5) and render as partial stars. */
    rating: z.number().min(0).max(5),
    genres: z.array(z.string()).default([]),
    /** One-line take, shown on cards and in the RSS feed. */
    description: z.string(),
    watchedDate: z.coerce.date(),
    /** Drafts are excluded from every page, the RSS feed, and the sitemap. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { reviews };
