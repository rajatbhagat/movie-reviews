# Reel Notes — movie reviews

A markdown-driven movie review site, built with [Astro](https://astro.build) and
deployed to GitHub Pages. Same stack and design system as
[rajatbhagat.github.io](https://github.com/rajatbhagat/rajatbhagat.github.io).

**Live at:** https://rajatbhagat.github.io/movie-reviews/

---

## Writing a review

Every review is one markdown file in `src/content/reviews/`. The filename
becomes the URL — `dune-part-two.md` → `/reviews/dune-part-two/`.

Two starting points, pick whichever suits you:

- **`everything-everywhere-all-at-once.md`** — a fully worked example. Every
  frontmatter field is annotated inline with YAML comments, which the build
  strips, so none of the commentary reaches the published page. Copy this one
  if you want the explanation as you go.
- **`_template.md`** — the bare skeleton, no commentary. Copy this one once you
  know the shape.

Then:

1. Copy the file to a new filename.
2. Fill in the frontmatter.
3. Write the review in markdown below it.
4. Delete `draft: true` if present.
5. Commit and push to `main`. GitHub Actions builds and deploys it.

### Frontmatter

```yaml
---
title: 'Dune: Part Two'      # required
year: 2024                    # required, number
director: 'Denis Villeneuve'  # required
rating: 9                     # required, 0–10, decimals allowed (7.5)
poster: './images/dune.jpg'   # optional thumbnail; omit for a fallback tile
genres: [Sci-Fi, Drama]       # optional; new genres create pages automatically
description: 'One-line take.' # required; shown on cards and in the RSS feed
watchedDate: 2026-07-20       # required; drives the sort order
draft: false                  # optional; true hides it everywhere
---
```

Nothing else needs editing to add a review or a genre — the homepage, the genre
pages, the RSS feed, and the sitemap are all generated from these files. Files
beginning with `_` are ignored entirely, which is why the template never
publishes.

### Images

All images live in `src/content/reviews/images/` and are referenced with a
relative path starting `./`. Astro resizes, re-encodes, and content-hashes them
at build time, so drop in the largest version you have — don't pre-shrink
anything. A path that doesn't resolve fails the build rather than shipping a
broken image.

**Thumbnail.** The `poster` frontmatter field puts a thumbnail on the left of
the review, both in the list and at the top of the review itself:

```yaml
poster: './images/dune.jpg'
```

Any dimensions work — it's cropped to a 2:3 poster shape. Omit the field and
the review falls back to a lettered tile built from its title, so a library
with only some posters filled in still looks deliberate.

**Images in the body.** Add as many as you like, anywhere in the markdown:

```markdown
![Alt text describing the image](./images/my-screenshot.jpg)
```

These render wider than the text column so detail stays legible.

---

## Local development

Requires Node 22 (`nvm use 22`).

```bash
npm install
npm run dev      # http://localhost:4321/movie-reviews/
npm run build    # static output in dist/
npm run preview  # serve the built site
```

Note the `/movie-reviews/` path in the dev URL — it mirrors production.

---

## Deploying

### First-time setup

1. Create a GitHub repo named **`movie-reviews`** under your account.
2. Push this directory to it (`main` branch).
3. In the repo: **Settings → Pages → Build and deployment → Source =
   "GitHub Actions"**.

`.github/workflows/deploy.yml` handles every push to `main` from there.
`.github/workflows/pr.yml` build-checks pull requests.

### About subdomains

GitHub Pages **cannot** give you a subdomain of `github.io`. That namespace
allocates exactly one host per account — `rajatbhagat.github.io` — and there is
no way to create `movies.rajatbhagat.github.io`. (Naming a repo
`movies.rajatbhagat.github.io` does not work either; it just publishes at
`rajatbhagat.github.io/movies.rajatbhagat.github.io/`.)

So the options are:

| Option | URL | Cost |
| --- | --- | --- |
| **Project site** (current setup) | `rajatbhagat.github.io/movie-reviews/` | free |
| **Custom subdomain** | `movies.yourdomain.com` | price of a domain |

### Moving to a custom subdomain later

This site is built so the switch is a two-line change:

1. In `astro.config.mjs`, set `site: 'https://movies.yourdomain.com'` and
   `base: '/'`.
2. Add `public/CNAME` containing `movies.yourdomain.com`.
3. At your DNS provider, add a `CNAME` record: `movies` → `rajatbhagat.github.io`.
4. In the repo: **Settings → Pages → Custom domain**, enter the subdomain and
   tick **Enforce HTTPS** once the certificate is issued.
5. Update the `Sitemap:` line in `public/robots.txt`.

Every internal link goes through `src/utils/url.ts`, which reads `base` — so
nothing else has to change.

---

## Structure

```
src/
  content/reviews/      the reviews — this is the only folder you edit day to day
  content.config.ts     frontmatter schema
  data/site.json        title, tagline, links — edit to rebrand
  pages/
    index.astro         all reviews, newest first
    reviews/[...id]     one review
    genres/             genre index + one page per genre
    about.astro
    rss.xml.ts
  components/           ReviewCard, Rating (star bar), Header, Footer
  layouts/BaseLayout    <head>, theme toggle, nav
  styles/global.css     design tokens — change --accent to re-colour the site
  utils/url.ts          base-path-aware link helper
```

## Sample content

`everything-everywhere-all-at-once.md`, `dune-part-two.md`, `past-lives.md`,
and `the-menu.md` are placeholder reviews so the site has something to render.
**They are not your opinions** — keep the first one around as a reference while
you get started, then delete all four.
