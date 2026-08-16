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
    components.css      Hero, editorial, contact, page-hero, legal
public/                 Copied verbatim to the site root (logos, favicon, CNAME)
```

The home page is a **single page**: hero, studio, contact. The nav and footer
point at `#studio` and `#contact`; `/privacy/` is the only separate route.

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
- **Body copy is approved and verbatim. Do not rewrite it**, and don't pad the
  page with new prose. If a section needs a heading that isn't in the approved
  text, leave it out or use a plain one-word label rather than carving a
  headline out of a sentence that then repeats below it.
- The footer tagline ("An independent studio crafting software that works") is
  the only string that isn't a direct quote from the approved copy. Change it
  if it isn't wanted.
- CSS is kept free of dead rules: when a section is removed, its styles go with
  it. `scratchpad/unused.mjs` in the working session cross-checked class names
  against the markup — worth re-running after any structural change.
