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
  pages/                One file per route (index, about, privacy)
  styles/
    tokens.css          Colour, type, and spacing variables — edit here first
    base.css            Reset, document defaults, type primitives, .button/.link
    layout.css          Shell, header/footer, section scaffolding
    components.css      Hero, status strip, cards, blocks, panel, contact, legal
public/                 Copied verbatim to the site root (logos, favicon, CNAME)
```

## Design

The site is **midnight-dominant**, matching the identity: the brand board, the
app icons, and the favicon are all dark grounds, and the silver crescent only
resolves against one.

Sections sit on one continuous midnight ground and are separated by hairlines
and by changes in rhythm — full-bleed hero, horizontal status strip, 2×2 card
grid, column blocks, centred panel — rather than by swapping background colours.

Two typefaces only: **Inter Tight** for everything visible, **JetBrains Mono**
for structure (labels, indices, metadata).

### The glow

Every SVG in the brand kit declares this gradient and none of them use it:

```
<radialGradient id="glow"> #4F6DFF @ 0.36 → transparent
```

It's the site's one atmospheric device (`--glow`, `.glow`). It is always a
background layer behind content — never composited onto logo artwork, which the
kit's usage rules explicitly forbid.

## Brand

Colour tokens in `src/styles/tokens.css` are copied verbatim from **Lunareos
Brand Kit v2** (`06-Brand-Guidelines/lunareos-brand-tokens.json`). Change them
there and let the semantic tokens inherit; don't adjust colours further down.

Logo files in `public/` are unmodified kit assets:

| File | Use |
|---|---|
| `lunareos-logo-horizontal-reversed.svg` | Header and footer lockup |
| `lunareos-symbol-silver.svg` | Hero mark; header below 700px |
| `favicon.svg` | Browser icon (kit's `lunareos-favicon.svg`) |

### ⚠️ Known defect in the brand kit

The kit designates `01-Primary/lunareos-logo-horizontal-dark.svg` as the
light-background primary, but its crescent is filled with the silver gradient
(`#FFFFFF → #A8B0C2`). Against any light ground the symbol is effectively
invisible — only the wordmark reads.

The dark theme sidesteps this today, since every surface here is midnight. It
will bite the moment anything needs a light background — a PDF, an invoice, a
one-colour print, a partner's site. **The fix belongs in the kit:** a
light-background primary with the symbol in Midnight or a dark gradient.

### Sizing

The lockup files carry ~18% empty canvas on the right — artwork spans only 73%
of the 1600-unit viewBox — so the CSS box must be larger than the artwork you
want. The kit's minimums are 140px of artwork for the horizontal lockup and 24px
for the symbol; `--logo-lockup-w` and `--logo-symbol-w` respect both, and the
header falls back to the symbol below 700px rather than shrinking the lockup
past its minimum.

The header is deliberately **opaque**, not translucent: the reversed lockup
ships with a baked-in `#0A0D16` background rectangle, which would show as a
solid plate against a blurred header once content scrolled beneath it. For the
same reason `--ground` must stay exactly Midnight.

### Accessibility

All text meets WCAG AA. Two derived tokens exist because the brand accent
doesn't clear it on its own:

- `--accent-text` (`#7E93FF`) — the accent is 4.2:1 on `--surface`, short of AA
  for body-size text, so words in accent colour use this instead.
- `--accent-fill` (`#4763F5`) — white on `#4F6DFF` is 4.2:1, so a solid accent
  button would fail; this is the accent a step deeper. Hover goes deeper still
  and takes its brightness from the glow rather than a lighter fill.

`--accent` itself is unchanged and still used for glows, borders, rules, and
markers, where the AA text threshold doesn't apply.

### Link preview

`og-image.png` is 1200×630. Regenerate it as a **PNG** — no major platform
renders SVG in link previews, which is why the original `og-image.svg` produced
blank previews.

## Notes

- `src/pages/privacy.astro` is a **placeholder**. It needs legal review before
  any product ships, and its `LAST_UPDATED` constant should be bumped on edit.
- Body copy across the site is a first draft written to establish the
  positioning. Read it as a proposal, not as finished messaging.
