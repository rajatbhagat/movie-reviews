# Handoff — Reel Notes (movie-reviews)

Status of the site as built, the decisions behind it, and a prioritised list of
what to build next. Written for whoever (or whatever) picks this up next.

**Live:** https://rajatbhagat.github.io/movie-reviews/
**Repo:** https://github.com/rajatbhagat/movie-reviews

---

## 1. What exists today

A markdown-driven movie review site. Adding a review is one `.md` file and a
`git push`; everything else generates from frontmatter.

Built to mirror the stack and design system of the author's portfolio
(`rajatbhagat/rajatbhagat.github.io`) so the two read as siblings — same
layout primitives, theme toggle, view transitions, and deploy shape, with a
warmer amber accent.

**Stack:** Astro 5 (static), content collections, `@astrojs/rss`,
`@astrojs/sitemap`. No UI framework, no client-side state, no external runtime
dependencies. Node 22.

### Shipped

| PR | What |
| --- | --- |
| #1 | The site: collections, homepage, genre pages, review pages, RSS, sitemap, 404, About, deploy workflows |
| #2 | Optional poster thumbnails with a lettered fallback tile; in-body images documented and demonstrated |
| #3 | Ratings moved from a 10-point to a 5-point scale |

All merged and deployed.

### Routes

| Route | Source |
| --- | --- |
| `/` | `src/pages/index.astro` — all reviews, newest watched first |
| `/reviews/<slug>/` | `src/pages/reviews/[...id].astro` |
| `/genres/` | `src/pages/genres/index.astro` — genre index with counts |
| `/genres/<slug>/` | `src/pages/genres/[genre].astro` |
| `/about/` | `src/pages/about.astro` |
| `/rss.xml` | `src/pages/rss.xml.ts` |
| `/404` | `src/pages/404.astro` |

### Content model

One markdown file per review in `src/content/reviews/`. Filename becomes the
slug. Schema lives in `src/content.config.ts`.

```yaml
title: 'Dune: Part Two'      # required
year: 2024                    # required, number
director: 'Denis Villeneuve'  # required
rating: 4.5                   # required, 0–5, decimals render as partial stars
poster: './images/dune.jpg'   # optional; omit for a lettered fallback tile
genres: [Sci-Fi, Drama]       # optional; any new string generates its own page
description: 'One-line take.' # required; used on cards and in RSS
watchedDate: 2026-07-20       # required; drives sort order
draft: false                  # optional; true hides it everywhere
```

Genre pages, the genre index, RSS, and the sitemap are all derived — adding a
review or a genre needs no code change.

### Components

- `Poster.astro` — thumbnail with a 2:3 box. Renders the optimised image when
  `poster` is set, otherwise a gradient tile with up to two title initials.
  Two sizes: `size="card"` (92px) and `size="detail"` (180px).
- `Rating.astro` — five-star bar. A filled overlay clipped to `rating / 5`
  renders halves and other fractions without extra glyphs. Sizes `sm` / `lg`.
- `ReviewCard.astro` — poster left, text right.
- `Header.astro` / `Footer.astro` — nav, theme toggle, mobile drawer.
- `BaseLayout.astro` — `<head>`, meta, theme bootstrap, view transitions.

---

## 2. Decisions and constraints — read before changing things

**The site is served from a subpath, not a subdomain.** GitHub Pages allocates
exactly one `*.github.io` host per account, so `movies.rajatbhagat.github.io`
cannot exist. Naming a repo that just publishes it at
`rajatbhagat.github.io/movies.rajatbhagat.github.io/`. The site therefore ships
as a project site with `base: '/movie-reviews'`.

**Consequence: never hardcode an internal link.** Every internal URL goes
through `url()` in `src/utils/url.ts`, which reads `import.meta.env.BASE_URL`.
A literal `href="/reviews/"` will 404 in production while working in dev.
This also keeps a future move to a real custom subdomain to a two-line change
(`site` + `base: '/'` in `astro.config.mjs`, plus `public/CNAME`).

**Genre slugs are case-insensitive.** `slugify()` in `src/utils/slug.ts`
collapses `Sci-Fi`, `sci-fi`, and `SCI-FI` into one genre. Display keeps the
first spelling encountered.

**Files starting with `_` are excluded from the collection** via the loader's
`!**/_*.md` pattern. That is why `_template.md` never publishes.

**Pushing requires SSH.** The `gh` token has scopes `gist, read:org, repo` but
not `workflow`, so pushing anything under `.github/workflows/` over HTTPS is
rejected. The remote is already `git@github.com:rajatbhagat/movie-reviews.git`.

**`main`'s root is an empty commit.** Deliberate, so PR #1's diff could carry
the entire site. If a local checkout has unrelated pre-rebase history, sync
with `git fetch && git reset --hard origin/main` rather than `git pull`.

**Pages source must stay "GitHub Actions"** (Settings → Pages). Deploy runs
fail on a missing `github-pages` environment otherwise.

### Sample content is not the author's opinions

`everything-everywhere-all-at-once.md`, `dune-part-two.md`, `past-lives.md`,
and `the-menu.md` are placeholders. The first doubles as the annotated
copy-me template (its frontmatter is documented inline in YAML comments,
which the build strips). The two JPGs in `src/content/reviews/images/` are
generated placeholders with "PLACEHOLDER" printed on them. All of it should be
deleted as real reviews arrive — don't build features that depend on it.

---

## 3. Gotchas already paid for

Three bugs that cost real time. Don't reintroduce them.

**Scoped class names can collide with `global.css`.** A variant class named
`card` inside `Poster.astro` picked up the global `.card` rules (border,
padding, shadow), boxing every thumbnail. Astro scoping does not protect
against this — a scoped `.card` still matches an element that also carries the
global class. Variants are now prefixed (`size-card`, `size-detail`).

**`aspect-ratio` is ignored when both dimensions are explicit.** Astro's
`<Image>` emits `width`/`height` attributes, which browsers apply as
presentational hints. Setting only `width: 100%` in CSS leaves the height hint
in force, so posters rendered at full intrinsic height while sibling `<div>`s
with the same rule looked fine. `height: auto` is load-bearing in
`Poster.astro` — there is a comment saying so.

**Built HTML looking correct proves nothing about layout.** Both bugs above
passed every markup assertion. They were caught by screenshotting the running
site.

---

## 4. How to build and verify

```bash
npm install
npm run dev      # http://localhost:4321/movie-reviews/
npm run build    # static output in dist/
npm run preview  # serve the built site
```

`npm run build` is the real gate: the content schema runs at build time, so a
bad `poster` path, an out-of-range `rating`, or a missing required field fails
the build and names the offending file. CI (`.github/workflows/pr.yml`) runs
the same build on every PR.

**For any UI change, look at it.** Headless Chrome against `npm run preview`:

```bash
npm run preview &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1000,1100 \
  --screenshot=/tmp/home.png \
  http://localhost:4321/movie-reviews/
```

Caveat: macOS clamps windows to roughly 500px minimum width, so
`--window-size=390,x` does **not** give a real phone viewport — it renders
wider and crops, which looks like a horizontal-overflow bug that isn't there.
Verify narrow layouts at 700px (below the 720px nav breakpoint) and reason
about the rest.

---

## 5. Recommended next work

Ordered by value per unit of effort. Independent of each other — pick any
subset. Sizes are rough.

### 5.1 Social preview images — **do this first** (small)

*This is a defect, not an enhancement.*

`src/layouts/BaseLayout.astro` sets no `og:image` or `twitter:image` at all.
Every link shared to Slack, iMessage, or Twitter renders as a bare text card.
The omission came from adapting the portfolio's layout, which did have one.

- Add an optional `image` prop to `BaseLayout`; review pages pass their
  `poster`.
- Provide a site-wide fallback for pages with no poster (`/`, `/genres/`,
  `/about/`) — a simple branded image in `public/` is enough.
- `og:image` must be an **absolute** URL. Build it with
  `new URL(poster.src, Astro.site)`; do not use `url()`, which yields a path.
- Verify with the built HTML, then paste a deployed URL into a link-preview
  debugger.

**Done when:** a review URL shared anywhere shows its poster.

### 5.2 A "best of" view (small)

The site answers "what did you watch recently?" but not "what should I
watch?" — which is why most readers arrive. The content already supports it;
nothing surfaces it.

- Either a `/best/` page listing everything rated 4+, or rating-sorted
  ordering on an existing page. A static page is simpler than a client-side
  sort toggle and needs no JS.
- Link it from the nav and from the homepage meta line next to
  "browse by genre".
- Decide tie-breaking explicitly (suggestion: rating desc, then `watchedDate`
  desc).

**Done when:** a visitor can reach the highest-rated reviews in one click.

### 5.3 Homepage pagination (small, but time-sensitive)

`src/pages/index.astro` renders every non-draft review on one page. Fine at
20; at 150 it is a very large page and a wall of thumbnails before anything
readable.

- Use Astro's built-in `paginate()` in `getStaticPaths`.
- **Keep `/` as page 1** so existing links and the sitemap stay valid; put
  later pages at `/page/2/` etc.
- Remember `url()` for the prev/next links.

Worth doing *before* the library grows — cheap now, a URL-compatibility
problem later.

**Done when:** `/` shows a bounded number of reviews with working pagination,
and `/` itself still lists the newest.

### 5.4 Related reviews (small)

Three cards at the foot of each review sharing a genre. Turns one-review
visits into several. All the data already exists.

- Exclude the current review; prefer the most genre overlap; fall back to
  recency. Handle "fewer than three matches" and "no genres" without
  rendering an empty section.
- Reuse `ReviewCard.astro`.

**Done when:** a review with genres shows up to three genuinely related
reviews, and one without genres shows no empty block.

### 5.5 Search (medium — worth it past ~30 reviews)

[Pagefind](https://pagefind.app) is the right fit: it indexes at build time,
self-hosts its assets, and needs no external service, so it does not
compromise the static, no-third-party-runtime setup. Run it as a post-build
step and mount its UI on a `/search/` page.

Not urgent at four reviews. Revisit when browsing gets tedious.

### 5.6 A stats page (small, optional)

Rating distribution, most-watched genres, films by decade, reviews per month.
Not useful, genuinely fun, and entirely derivable from existing frontmatter.
Makes the site feel like a collection rather than a list.

If you build charts here, keep them inline SVG — no charting library, in
keeping with the zero-runtime-dependency approach.

---

## 6. Explicitly not recommended

**Comments.** Requires a third-party service, invites spam, and creates a
moderation chore for a site whose appeal is that publishing is `git push`.
If discussion is wanted, link a Letterboxd profile — `src/data/site.json`
already has an empty `letterboxd` field for exactly that.

**A CMS.** The markdown workflow is the feature, not a limitation to be
abstracted away.

**A UI framework.** Nothing here needs client-side state. Adding React or
similar for a stats page or a sort toggle would cost more than it returns.

---

## 7. Conventions to keep

- Internal links go through `url()`. Always.
- Match the existing comment style: explain *why*, not *what*, and only where
  the reason isn't obvious from the code.
- Scoped styles per component; shared primitives (`.card`, `.pill`, `.muted`,
  `.btn`) live in `src/styles/global.css`. Check for name collisions before
  adding a scoped class.
- Every colour is a CSS custom property with a light and a dark value. Dark
  mode is a `[data-theme]` attribute with a `prefers-color-scheme` fallback
  for no-JS visitors — both blocks must be kept in sync.
- One feature per PR, and let CI pass before merging.
