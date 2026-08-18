# Lunareos

Marketing website for Lunareos LLC. Static HTML built with [Astro](https://astro.build),
deployed to GitHub Pages at [lunareos.com](https://lunareos.com).

The site ships one small script, for the system view on the home page, and
nothing else. Every page renders fully as HTML and CSS first; see
[The system](#the-system).

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # type-checks, then writes static output to dist/
npm run preview  # serve the built output
```

`main` deploys automatically via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

## Layout

```
src/
  site.ts               Shared constants — nav, email, company name
  layouts/Base.astro    <head>, header, footer, global CSS imports
  components/           Header, Footer, FooterMini, SystemView
  pages/                index.astro (the system) + studio.astro + privacy.astro
  styles/
    tokens.css          Colour, type, and spacing variables — edit here first
    base.css            Reset, document defaults, type primitives, .button
    layout.css          Shell, header/footer, section scaffolding
    components.css      Feature, studio index, editorial, contact, legal
    system.css          The opening system view
public/                 Copied verbatim to the site root (logos, favicon, CNAME)
```

Three routes:

| Route | What it is |
|---|---|
| `/` | **The system**, and nothing else — one screen that fills the viewport and does not scroll. Every project is reachable from orbit. |
| `/studio/` | The work: the featured project (`#currently`), the studio index (`#studio`), then contact. |
| `/privacy/` | The policy. The only page still using the `.editorial` two-column layout. |

The home page holds one screen, so it takes `FooterMini` — a single row with
the interaction hint, the copyright, and the privacy link — instead of the full
footer. `Base.astro` switches on `chrome="system"`.

`/studio/` is the old home page below its hero, moved rather than rewritten:
the copy, the sections, and their order are unchanged.

### The system

**The home page is this and nothing else.** Lunareos is the body at the centre;
everything the studio builds orbits it, and selecting an object opens its
panel. There is no scroll and no content below — the work has its own page.

It carries the page's `h1`, which is still the approved statement.

Bodies are **derived** from `FEATURED` and `STUDIO_PROJECTS`, not listed again:
add a project in `site.ts` and it appears both in orbit and in the index below.
`SYSTEM_BODIES` pairs each one with a ring, an angle, and a dot size; the first
two studio projects are hand-placed so no two labels collide, and anything
beyond them falls to the outer ring automatically.

Positions are computed in the component, not eyeballed in CSS. The orbital
plane is tilted `SYSTEM_TILT` degrees, which foreshortens the vertical axis by
`cos(tilt)` and nothing else, so a body at angle θ on a ring of radius r lands
at `(r·cos θ, r·sin θ·cos tilt)` — which is why every dot sits exactly on its
ring rather than near it.

**Nothing in it is invented.** Every value a visitor reads — name, status,
kind, summary, platforms — comes from the project's own entry. A body with no
`href` gets no link, the same rule the studio index follows. Resist adding
system-flavoured furniture (signal readouts, sector coordinates, an archive of
work that doesn't exist): it is the same filler as a fake metric, wearing a
different costume.

Two things about the centre. It is **not the logo** — it is a body lit from the
upper right, and the crescent along its limb is produced by the lighting, which
is the shape the identity is drawn from arrived at honestly. And the light is
written as `radial-gradient(ellipse 45% 45% …)`, not `circle 45%`: a percentage
radius is invalid on `circle` and silently drops the whole layer, which renders
as an evenly lit globe with no terminator at all.

**This section is the only JavaScript on the site**, and it is enhancement
only. The bodies are ordinary fragment links and the panels open on `:target`,
so without JavaScript every object is still reachable and readable. The script
adds pointer drift, closes on Escape, moves focus to the opened panel, and
keeps the URL clean. The star field is rendered at build time from a seeded
generator — never by script, so it is there before anything loads and identical
on every build.

The header carries **one nav link**, because there is now a real second page to
reach: the home page is the system, and the work lives at `/studio/`. It is set
as a mono label like every other piece of structure on the site.

`NAV_LINKS` carries **pages only** — never anchors to sections of the page you
are already looking at. That was the rule that kept the nav off the site when
there was only one page, and it is the same rule that brought it back.

### Adding a project

Both middle sections are rendered from `src/site.ts`; `index.astro` holds no
project copy.

- `FEATURED` — the one project on the front of the page. It gets the large
  treatment, the platform row, and the product visual.
- `STUDIO_PROJECTS` — the product index below it. Append an object with `name`,
  `summary`, `kind`, optional `details`, and optionally `href`.

`details` is a short list of product facts, each with `label` and `value`.
Keep it factual and compact: stage, focus, mode, scope.

`platforms` is a plain array of names (`['macOS', 'Windows', …]`); the template
owns the separator, so don't put `·` in the data. On `FEATURED` it renders under
the summary; on a `StudioProject` it renders in the row's metadata group, beside
the kind label and at the same weight — one metadata line, not a hierarchy.

The field is optional in both places and **the row simply omits it when it is
absent**, which is why neither current project shows one: their platforms aren't
decided, and inventing them is exactly the filler this page refuses. Add the
array when the answer is real.

`kind` is a single mono phrase (`Available`, `Pre-alpha`, `In development`).
Every kind renders at the same weight and colour on purpose: these are labels
*on* the work, not a taxonomy the studio is sorted into.

**Omit `href` until there is somewhere real to send people.** The row then
renders as a plain `<div>` with no arrow, rather than an arrow pointing at a
placeholder.

### The product visual

`public/muse-preview.webp` (2600×1625) is rendered from `museapp.html` — MUSE's
own UI mockup, in its dark theme and `edit` view.

That mockup is **gitignored and lives in the MUSE repo**, not this one, so a
fresh clone of this site will not have it. Only the rendered WebP is committed
here. Drop a current copy in the repo root when you need to re-render; the
commands below assume it is there.

To regenerate after the mockup changes, render it at 8:5 and 2× — the visual is
displayed around 1300px wide, so 2600px is the retina width and anything larger
is bytes nobody sees:

```bash
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --hide-scrollbars --force-device-scale-factor=2 \
      --screenshot=shot.png --window-size=1600,1000 --virtual-time-budget=6000 \
      "file://$PWD/museapp.html"
sips -Z 2600 shot.png --out shot-2600.png
cwebp -q 85 -m 6 shot-2600.png -o public/muse-preview.webp
```

`museapp.html` opens in the light theme and the `write` view; the shipped shot
is dark + `edit`, set by running this before the capture:

```js
document.documentElement.dataset.theme = 'dark'
document.body.dataset.view = 'edit'
document.querySelectorAll('.demo').forEach((e) => e.remove())  // mockup controls
```

### The three art directions

The `<picture>` has three bands, because one capture cannot hold a three-panel
desktop app at every width:

| Band | Source | Why |
|---|---|---|
| `min-width: 1321px` | `muse-preview.webp` | The whole application, at ≥75% of its design scale — the point at which its own type stays readable. |
| `641px–1320px` | `muse-preview-mid.webp` *(not yet rendered)* | Manuscript + Changes, binder dropped. |
| `max-width: 640px` | `muse-preview-narrow.webp` | A detail shot of the Changes panel. A phone cannot hold the whole window at a legible size. |

**The middle capture does not exist yet**, so `FEATURED.imageMid` is
`undefined` and the page runs a different arrangement in the meantime — see
[The window crop](#the-window-crop). Do **not** produce the middle capture by
cropping `muse-preview.webp` as a file: the title bar, the chapter header, and
the manuscript panel all have content at different x offsets, so every vertical
cut line slices either `3,195 words`, the view switcher, or the manuscript text
itself. It has to be a real render.

### The window crop

While `imageMid` is missing, `index.astro` adds `.feature__visual--crop` and
the arrangement becomes:

| Band | What happens |
|---|---|
| `min-width: 1321px` | The wide capture, uncropped. |
| `1000px–1320px` | The wide capture at 121.6% of the frame, pinned right, with the frame clipping the binder off the left edge. |
| `max-width: 999px` | The portrait detail, capped at 28rem, left-aligned. |

This is a **frame clipping a real render**, not a re-crop of the file — the
asset is untouched and the CSS is deleted in one block when the real capture
lands.

The cut line is design `x=284`, measured off the master: the title bar's view
switcher starts there, and anything further right slices the switcher. It falls
14px short of clearing `3,195 words` in the chapter header — the two rows
genuinely overlap, so **no cut line takes every element whole** — and a 40px
gradient at the frame's left edge dissolves the remainder rather than leaving
it sliced.

The geometry follows from the capture being a 1600px-wide render: the frame
shows `1600 − 284 = 1316` of it, so the image is drawn at `1600/1316` = 121.6%
of the frame and the frame's height is `121.6% × (1625/2600)` = 76% of its
width, hence `aspect-ratio: 1316 / 1000`. Re-measure all three numbers if the
mockup's chrome ever changes.

Dropping the binder buys back 21% of scale. The band edges are where that stops
being enough (1000px, below which even the cropped view falls under ~11px of
the app's own type) and where the uncropped capture clears the same bar on its
own (1320px).

Render it the same way the wide one is, at 8:5 and 2×, with the binder
collapsed — the mockup's own control, not a CSS override:

```bash
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --hide-scrollbars --force-device-scale-factor=2 \
      --screenshot=shot-mid.png --window-size=1000,625 --virtual-time-budget=6000 \
      "file://$PWD/museapp.html"
cwebp -q 85 -m 6 shot-mid.png -o public/muse-preview-mid.webp
```

Then set `imageMid: '/muse-preview-mid.webp'` in `site.ts` with its real
dimensions. Nothing else needs to change — the `<source>` is already wired and
appears as soon as the field is a string.

### The narrow crop

`public/muse-preview-narrow.webp` (812×1040) is the same mockup, wired through
the `<picture>` element above. A three-panel desktop app shrunk to a phone is
texture, not an interface, so narrow viewports get a **detail shot** of the
Changes panel instead of the whole window.

It is a viewport crop, not an image crop — an iframe of the mockup positioned
inside a clipping box, so the capture is a true render at 2× rather than a
resampled region:

```html
<div style="width:406px;height:520px;overflow:hidden;position:relative">
  <iframe src="museapp.html" scrolling="no"
          style="width:1600px;height:1000px;border:0;position:absolute;left:-1194px;top:-120px"></iframe>
</div>
```

Screenshot that at `--window-size=406,520 --force-device-scale-factor=2`, then
`cwebp -q 85`. Keep the height ending in the gap **between** two change cards:
cutting through a row of buttons reads as a mistake, while cutting through the
next card's header reads as a list that scrolls.

Two things follow from having more than one source. `alt` lives on the `<img>`
and cannot vary per source, so it describes the idea on screen rather than the
pixels of any one crop. And the crop is portrait, so `.feature__visual` takes a
`max-width` of `28rem` — a little over the crop's own 406px rendered width, so
it is never meaningfully upscaled — and sits **left-aligned** with the copy
above it. Centred under left-aligned copy it read as a card that had floated in.

**WebP with no fallback** is deliberate. It is not the site's oldest
requirement — `color-mix()` in `tokens.css` needs Safari 16.2 (2022) and WebP
needs Safari 14 (2020), so a fallback image would carry weight for browsers the
stylesheet already excludes.

Dimensions live in `site.ts` beside each path (`imageW`/`imageH`,
`imageNarrowW`/`imageNarrowH`) and render onto the `<img>` and `<source>`. Update
them whenever a capture changes size — they are what hold the layout while the
image loads. Update `imageAlt` if a capture changes what is on screen.

## Design

The site is **midnight-dominant**, matching the identity: the brand board, the
app icons, and the favicon are all dark grounds, and the silver crescent only
resolves against one.

Sections sit on one continuous midnight ground, separated by hairlines rather
than by swapping background colours: full-bleed hero, editorial two-column,
centred contact.

Two typefaces only: **Jost** for everything visible, **JetBrains Mono** for
structure (labels, metadata). Jost is the brand kit's recommended pairing —
both it and the wordmark are geometric, so the UI type echoes the letterforms
instead of sitting beside them.

### The scale

One order, and it is the order the page wants read:

| Token | Ceiling | Used by |
|---|---|---|
| `--size-display` | 5.25rem | The hero statement, and nothing else |
| `--size-h1` | 3.25rem | A product wordmark |
| `--size-h2` | 2.375rem | Contact, inner-page titles |
| `--size-h3` | 1.375rem | Project names, legal headings |

The hero used to be capped at 3.375rem so its headline held one line, which put
it **below** the product and contact headings at every width — the statement was
the third-largest thing on its own page. A display setting is allowed to wrap;
two lines is the intended state, and the ceiling is now set by the statement
rather than by the line count.

Tracking and leading are set **per level**, not once for all headings: what
keeps 84px from looking loose makes 22px look jammed. Bare `h1`–`h4` default to
the small end (`--track-h3`, `--leading-h3`) and every component that sets a
larger size sets its tracking and leading with it.

### The glow

`--glow` / `.glow` is the site's one atmospheric device — a soft accent radial
behind the hero mark and the contact block.

It is always a background layer behind content, **never composited onto logo
artwork**, which the kit's rules explicitly forbid. (Brand Kit v2 declared this
gradient in all 18 of its SVGs and referenced it in none; v4 removed it as dead
code. The site keeps the idea as its own, applied only to the page.)

### Motion

Two animations exist on the whole site, both pure CSS — the zero-JavaScript
build is unchanged.

1. **The hero entrance.** Eyebrow, statement, supporting line, then the mark:
   opacity plus a 12px rise, 500ms, staggered ~90ms apart. The mark fades
   without rising and ends at its own `0.82`, because moving it takes back the
   attention the size reduction just gave to the headline.
2. **One reveal on the product visual**, on a `view()` scroll timeline.

Both are wrapped in `prefers-reduced-motion: no-preference` rather than relying
on the global override in `base.css`, so a reduced-motion visitor gets no
animation at all rather than one compressed to 0.01ms. The reveal is also
behind `@supports (animation-timeline: view())`, so a browser without scroll
timelines renders the static page.

**Nothing else animates**, and that is a decision, not a gap: index rows,
section headings, the contact block, and the glow layers are all deliberately
static. Adding a reveal to each section is what turns a studio site into a
generic animated landing page.

## Brand

Assets and colour tokens come from **Lunareos Brand Kit v4**. Tokens in
`src/styles/tokens.css` are copied verbatim from
`06-Brand-Guidelines/lunareos-brand-tokens.json` — change them there and let the
semantic tokens inherit; don't adjust colours further down.

Logo files in `public/` are unmodified kit assets:

| File | Kit source | Use |
|---|---|---|
| `lunareos-wordmark-silver.svg` | `03-Wordmark/` | Header and footer wordmark |
| `lunareos-logo-horizontal-silver.svg` | `01-Primary/` | Available full lockup |
| `lunareos-symbol-silver.svg` | `02-Symbol/` | Hero mark; header below 560px |
| `favicon.svg` | `04-App-Icons/lunareos-favicon.svg` | Browser icon |
| `favicon.ico` | `04-App-Icons/` | Legacy browser icon |
| `apple-touch-icon.png` | `07-PNG/app-icon-midnight-180.png` | iOS home screen |

`muse-preview.webp` and `muse-preview-narrow.webp` are not kit assets — they are
product captures. See [The product visual](#the-product-visual).

Naming convention: **silver** = gradient, for dark backgrounds. **dark** = solid
Midnight, for light backgrounds. **white** = solid white. Since every surface
here is midnight, the site uses the silver set throughout.

### Palette caution

`--slate` (`#334155`) is **1.71:1 on Deep Indigo** — a border colour, not a text
colour. It is never used for type here. The kit's two optional additions cover
what the seven-colour palette lacks:

- `--ash` (`#94A3B8`) — body text on dark, 6.9:1 on Deep Indigo
- `--accent-text` (`#8DA2FF`) — links inside body copy

### One derived token

`--accent-fill` (`#4763F5`) is the only colour here that isn't from the kit. The
kit notes Accent clears AA on Midnight, but that measures the accent *as text*.
White text **on** `#4F6DFF` is 4.2:1, so a solid accent button at body size
fails; this is the accent a step deeper (4.8:1 with white). Hover goes deeper
still and takes its brightness from the glow rather than a lighter fill.

`--accent` itself is unchanged and still used for glows, borders, rules, and
markers, where the text threshold doesn't apply.

### Sizing

The header uses the wordmark-only asset on wider screens and the symbol below
the wordmark's useful reading size. `--logo-lockup-w` controls the rendered
wordmark width; the variable name is kept for the existing header/footer class
names.

### Type

The wordmark is a custom monoline drawing, not a typeface — **only nine glyphs
exist** (`L U N A R E O S M`). It has no font dependency and its wide spacing
must not be condensed.

The kit recommends pairing it with Poppins or Jost; the site uses **Jost**.

### Link preview

`og-image.png` is 1200×630. Regenerate it as a **PNG** — no major platform
renders SVG in link previews, which is why the original `og-image.svg` produced
blank previews.

## Notes

- `src/pages/privacy.astro` is a **placeholder**. It needs legal review before
  any product ships, and its `LAST_UPDATED` constant should be bumped on edit.
  The caveat lives in that file's frontmatter, not on the page.
- **Comments must not ship.** Astro renders `<!-- -->` into the output but
  strips `{/* */}` and frontmatter `//`, so use the latter two. Internal notes
  are for the repo, not for view-source. `grep -c '<!--' dist/**/*.html`
  should return 0.
- **Body copy is approved. Do not rewrite it**, and don't pad the page with new
  prose. Three rules it was written to, worth keeping if it changes again:
  - **Lunareos builds its own products.** There is no client work, so nothing
    on the page should invite a project or brief.
  - **A heading must not paraphrase the sentence beside it.** Compressing the
    prose into the heading above it makes a reader hear the same idea twice.
  - **The h1 names the company; the body speaks as "we."** Third person
    throughout reads like a press release about someone else.
- **The page shows work rather than explaining itself.** The hero states the
  idea once; everything below it is evidence. That means no services list, no
  "what we do", no category cards, no feature grid, and no second pass at the
  philosophy in prose — a section that only *describes* the studio has not
  earned its place. Naming real projects is what keeps the page from making an
  argument there is nothing on it to check.
- CSS is kept free of dead rules: when a section is removed, its styles go with
  it. `scratchpad/unused.mjs` in the working session cross-checked class names
  against the markup — worth re-running after any structural change.
