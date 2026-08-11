---
# ══════════════════════════════════════════════════════════════════════════
#  COPY THIS FILE to start a new review — it is a worked example using every
#  feature the site supports.
#
#  Every line in this block starting with # is a YAML comment. The build
#  strips them, so none of this reaches the published page. Keep them while
#  you're learning the shape; delete them when they stop being useful.
#
#  THE FILENAME BECOMES THE URL. This file is
#  everything-everywhere-all-at-once.md, so it publishes at
#  /reviews/everything-everywhere-all-at-once/. Lowercase and hyphens.
# ══════════════════════════════════════════════════════════════════════════

# Required. Quote it if the name contains a colon, e.g. 'Dune: Part Two'.
title: 'Everything Everywhere All at Once'

# Required. A plain number, no quotes.
year: 2022

# Required. Free text — comma-separate co-directors, as here.
director: 'Daniel Kwan, Daniel Scheinert'

# Required. 0–5, decimals allowed. The star bar is computed from this, so
# 3.5 renders as three and a half filled stars. Never write stars by hand.
rating: 4

# Optional thumbnail, shown on the left of this review everywhere it appears.
# Drop the file in src/content/reviews/images/ and point at it relatively.
# Any size works — it's cropped to a 2:3 poster shape and resized at build
# time, so use the biggest version you have. Leave the field out entirely and
# the review gets a lettered fallback tile instead (see the other three).
# The image below is a generated placeholder — replace it with a real poster.
poster: './images/eeaao-poster.jpg'

# Optional. ANY string works — a new genre generates its own page at
# /genres/<slug>/ with no code change. Casing is ignored when grouping, so
# "Sci-Fi" and "sci-fi" collapse into one genre.
genres: [Sci-Fi, Comedy, Drama]

# Required. One sentence, shown on the homepage cards and in the RSS feed —
# so make it your take, not a plot summary.
description: 'A maximalist multiverse comedy that turns out to be a very small story about a mother and a daughter.'

# Required, YYYY-MM-DD. Drives the sort order: the homepage is newest first.
watchedDate: 2026-08-08

# Optional, defaults to false. While true, the review is excluded from the
# homepage, genre pages, RSS feed, and sitemap. Uncomment to hide a work in
# progress:
# draft: true
---

<!-- The body is ordinary markdown. These section headings are a habit, not a
     requirement — rename or delete them freely. -->

## The short version

A laundromat owner being audited by the IRS discovers she is the least
successful version of herself across every universe that exists. It is loud,
overstuffed, and about ninety seconds too pleased with itself in places — and
then it lands an ending that is genuinely, unguardedly kind.

Recommended if you can tolerate roughly forty minutes of chaos before the film
tells you what it's actually about.

## What worked

Michelle Yeoh is doing two performances at once: the exhausted woman who has
run out of patience with her own life, and the action lead the film keeps
promising. Both are excellent. Ke Huy Quan's Waymond is the quiet argument the
whole movie is built around.

The structural trick is that every absurd bit pays off later:

- The hot dog fingers universe is a throwaway joke that becomes the most tender
  scene in the film.
- The googly eye is a gag for an hour and then a thesis statement.
- Even the tax audit — the most mundane possible framing device — turns out to
  be the point.

> "The only thing I do know is that we have to be kind. Please, be kind.
> Especially when we don't know what's going on."

That line should not work as well as it does after ninety minutes of rocks
talking to each other. It does.

![A placeholder still — swap this file for a real screenshot](./images/eeaao-still.jpg)

You can drop as many images as you like into the body like this. They render
wider than the text column so detail stays legible, and each one is resized and
hashed at build time.

## What didn't

The middle act is genuinely exhausting. There is a stretch where the film
mistakes *volume* for *escalation*, and the multiverse rules get explained
three separate times without ever becoming clearer.

Joy is written as a concept more often than as a person, which slightly
undercuts an ending that depends entirely on her being one.

## Final thoughts

The rare big swing that earns its sentimentality instead of just asserting it.
I'd put it a notch below [Past Lives](../past-lives/) as a film about family,
and several notches above almost anything else for sheer nerve.

<!-- IMAGES: put files in src/content/reviews/images/ and reference them
     relatively, as with the still above:

       ![Alt text describing the image](./images/my-screenshot.jpg)

     Add as many as you want, anywhere in the body. The path must start with
     ./ and the file must exist — a broken path fails the build instead of
     shipping a broken image. Internal links to other reviews are relative
     too, like the Past Lives link just above. -->

<!-- The two images in this review are generated placeholders. Delete them
     from src/content/reviews/images/ once you have real artwork. -->

