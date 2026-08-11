import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import site from '../data/site.json';
import { url } from '../utils/url';

export async function GET(context: APIContext) {
  const reviews = (await getCollection('reviews', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.watchedDate.valueOf() - a.data.watchedDate.valueOf()
  );
  return rss({
    title: site.title,
    description: site.metaDescription,
    // context.site is the bare origin; the feed's own home is origin + base.
    site: new URL(import.meta.env.BASE_URL, context.site!),
    items: reviews.map((review) => ({
      title: `${review.data.title} (${review.data.year}) — ${review.data.rating}/5`,
      description: review.data.description,
      pubDate: review.data.watchedDate,
      categories: review.data.genres,
      link: url(`/reviews/${review.id}/`),
    })),
  });
}
