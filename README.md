# Reel Notes — movie reviews

A markdown-driven movie review site, built with [Astro](https://astro.build) and
deployed to GitHub Pages. Same stack and design system as
[rajatbhagat.github.io](https://github.com/rajatbhagat/rajatbhagat.github.io).

**Live at:** https://rajatbhagat.github.io/movie-reviews/

---

## Writing a review

Every review is one markdown file in `src/content/reviews/`. The filename
becomes the URL — `dune-part-two.md` → `/reviews/dune-part-two/`.

1. Copy `_template.md` to a new filename.
2. Fill in the frontmatter.
3. Write the review in markdown below it.
4. Delete `draft: true`.
5. Commit and push to `main`. GitHub Actions builds and deploys it.

### Frontmatter

```yaml
---
title: 'Dune: Part Two'      # required
year: 2024                    # required, number
director: 'Denis Villeneuve'  # required
rating: 9                     # required, 0–10, decimals allowed (7.5)
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

Put images next to the review (e.g. `src/content/reviews/images/still.jpg`) and
reference them relatively: `![Caption](./images/still.jpg)`. They render wider
than the text column automatically.

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

`dune-part-two.md`, `past-lives.md`, and `the-menu.md` are placeholder reviews
so the site has something to render. **Delete them** when you add your own —
they are not your opinions.
