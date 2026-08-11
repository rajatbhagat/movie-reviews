// Every internal link goes through here. Astro serves this site under a base
// path ('/movie-reviews' on GitHub Pages), so hardcoded hrefs like "/reviews/"
// would 404. Changing `base` in astro.config.mjs is all it takes to move the
// site to a custom subdomain, because these two helpers read it.

// import.meta.env.BASE_URL is '/movie-reviews/' (or '/'); drop the trailing slash.
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Absolute in-site path: url('/reviews/') -> '/movie-reviews/reviews/' */
export function url(path: string): string {
  return `${BASE}/${path.replace(/^\/+/, '')}`;
}

/** Strip the base off a runtime pathname so nav matching works at any base. */
export function stripBase(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) return pathname.slice(BASE.length) || '/';
  return pathname;
}
