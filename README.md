# Lunareos

Marketing website for Lunareos LLC. Static HTML built with [Astro](https://astro.build),
deployed to GitHub Pages at [lunareos.com](https://lunareos.com).

The site ships **zero JavaScript** — every page is fully rendered HTML and CSS.

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
  components/           Header, Footer
  pages/                index.astro (single page) + privacy.astro
  styles/
    tokens.css          Colour, type, and spacing variables — edit here first
    base.css            Reset, document defaults, type primitives, .button
    layout.css          Shell, header/footer, section scaffolding
    components.css      Hero, feature, studio index, editorial, contact, legal
public/                 Copied verbatim to the site root (logos, favicon, CNAME)
```

The home page is **four sections**: hero, the featured project (`#currently`),
the studio index (`#studio`), then contact. `/privacy/` is the only separate
route, and the only page still using the `.editorial` two-column layout.

The header carries **no navigation** — the page is short enough to scroll and
the only external destination belongs to a product, not to Lunareos, so the
header holds the logo and a single Email button. If a real second *page* ever
appears, the nav comes back with it.

### Adding a project

Both middle sections are rendered from `src/site.ts`; `index.astro` holds no
project copy.

- `FEATURED` — the one project on the front of the page. It gets the large
  treatment and the product visual.
- `STUDIO_PROJECTS` — the index below it. Append an object with `name`,
  `summary`, `kind`, and optionally `href`.

`kind` is a single mono word (`Experiment`, `Utility`, `Available`,
`In development`). Every kind renders at the same weight and colour on purpose:
these are labels *on* the work, not a taxonomy the studio is sorted into.
Grouping the index into Writing / Security / Utilities is the thing the page is
specifically built not to do — the range is meant to show through the projects
themselves.

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

### The narrow crop

`public/muse-preview-narrow.webp` (812×1040) is the same mockup at
`max-width: 760px`, wired through a `<picture>` element. A three-panel desktop
app shrunk to a phone is texture, not an interface, so narrow viewports get a
**detail shot** of the Changes panel instead of the whole window.

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

Two things follow from having two sources. `alt` lives on the `<img>` and cannot
vary per source, so it describes the idea on screen rather than the pixels of
either crop. And the crop is portrait, so `.feature__visual` takes a
`max-width` at the same breakpoint — left at full width it would tower over a
tablet.

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

### The glow

`--glow` / `.glow` is the site's one atmospheric device — a soft accent radial
behind the hero mark and the contact block.

It is always a background layer behind content, **never composited onto logo
artwork**, which the kit's rules explicitly forbid. (Brand Kit v2 declared this
gradient in all 18 of its SVGs and referenced it in none; v4 removed it as dead
code. The site keeps the idea as its own, applied only to the page.)

## Brand

Assets and colour tokens come from **Lunareos Brand Kit v4**. Tokens in
`src/styles/tokens.css` are copied verbatim from
`06-Brand-Guidelines/lunareos-brand-tokens.json` — change them there and let the
semantic tokens inherit; don't adjust colours further down.

Logo files in `public/` are unmodified kit assets:

| File | Kit source | Use |
|---|---|---|
| `lunareos-logo-horizontal-silver.svg` | `01-Primary/` | Header and footer lockup |
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

v4 trims every canvas to the artwork plus even padding, so `--logo-lockup-w` is
a true rendered width. The kit's minimums are 140px for the horizontal lockup
and 24px for the symbol; below the lockup's floor the header switches to the
symbol rather than shrinking past it.

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
