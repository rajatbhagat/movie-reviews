import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Reviews live in src/content/reviews/ as markdown files.
// To add a review: drop a .md file there with the frontmatter below.
// To add a new genre: just use a new value in `genres` — the genre pages and
// the filter pills are generated automatically from whatever genres exist.
const reviews = defineCollection({
  // Files starting with `_` (e.g. _template.md) are skipped entirely.
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/reviews' }),
  // The schema is a function so it can use `image()`, which checks that a
  // poster path actually resolves and hands the pages real image metadata
  // (dimensions, hashed URL) for Astro to optimise at build time.
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number(),
      director: z.string(),
      /** Out of 5. Decimals are fine (3.5) and render as partial stars. */
      rating: z.number().min(0).max(5),
      /**
       * Optional thumbnail, path relative to the markdown file:
       *   poster: './images/dune-part-two.jpg'
       * Reviews without one fall back to a generated tile, so this can stay
       * empty. A path that doesn't resolve fails the build rather than
       * shipping a broken image.
       */
      poster: image().optional(),
      genres: z.array(z.string()).default([]),
      /** One-line take, shown on cards and in the RSS feed. */
      description: z.string(),
      watchedDate: z.coerce.date(),
      /** Drafts are excluded from every page, the RSS feed, and the sitemap. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { reviews };
