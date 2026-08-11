// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deployed as a GitHub Pages *project* site:
//   https://rajatbhagat.github.io/movie-reviews/
//
// To move to a custom subdomain (e.g. https://movies.example.com) change these
// two lines to `site: 'https://movies.example.com'` and `base: '/'`, and add a
// public/CNAME file. Nothing else needs touching — every internal link in the
// site is built by src/utils/url.ts from this `base`.
export default defineConfig({
  site: 'https://rajatbhagat.github.io',
  base: '/movie-reviews',
  integrations: [sitemap()],
});
