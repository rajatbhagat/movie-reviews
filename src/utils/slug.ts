// URL-safe slug for a genre name: "Sci-Fi" -> "sci-fi".
// Display names keep their original casing; URLs always use the slug, so
// "Sci-Fi", "sci-fi", and "SCI-FI" collapse into one genre.
export function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
