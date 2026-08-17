/**
 * Site-wide constants. Anything that appears in more than one place —
 * or that you'd want to change in exactly one place — lives here.
 */

export const SITE = {
  name: 'Lunareos',
  legalName: 'Lunareos LLC',
  url: 'https://lunareos.com',
  email: 'hello@lunareos.com',
  // The hero eyebrow. Names what Lunareos is rather than what it values —
  // three abstract nouns read as agency positioning, and this line sits
  // directly above a statement that already carries the ambition.
  tagline: 'Independent software studio',
  // Same sentence as the hero lede, verbatim. Keep the two in sync.
  description:
    'Lunareos is an independent studio exploring ideas, problems, and possibilities through software.',
} as const

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

/** Prefix an internal absolute path with Astro's configured deployment base. */
export const withBase = (path: string) => `${base}${path.startsWith('/') ? path : `/${path}`}`

export const FOOTER_LINKS = [
  { label: 'Studio', href: withBase('/#studio') },
  { label: 'Contact', href: withBase('/#contact') },
  { label: 'Privacy', href: withBase('/privacy/') },
] as const

/**
 * The project on the front of the page. It gets the large treatment; every
 * other project gets a row in the index below it.
 *
 * MUSE has its own product site, so this entry is a portfolio card pointing
 * there — not a second marketing page. `link` is the visible text; the arrow
 * beside it is decorative.
 */
export const FEATURED = {
  name: 'MUSE',
  summary: 'A writing environment for long-form work.',
  status: 'In development',
  /* Platform is the most publisher-level fact there is, and the one piece of
     metadata a studio site owes a reader that a product site would bury. Kept
     as data so the separator and casing are the template's decision. */
  platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'],
  href: 'https://musewritingapp.com',
  link: 'musewritingapp.com',
  /* Names what is on screen, under the visual. Deliberately does not repeat
     the platform row above it. */
  caption: 'Revision view',
  image: '/muse-preview.webp',
  imageW: 2600,
  imageH: 1625,
  /* A phone cannot hold a three-panel desktop app at a legible size, so narrow
     viewports get a detail shot of the Changes panel rather than the whole
     window shrunk to texture. The alt has to describe both, so it names the
     idea on screen and not the pixels of either crop. */
  imageNarrow: '/muse-preview-narrow.webp',
  imageNarrowW: 812,
  imageNarrowH: 1040,
  imageAlt:
    'MUSE in its revision view, where every tracked edit is listed as a change the writer can keep or put back.',
  /* The middle art direction: manuscript + Changes, binder dropped. Between
     roughly 640px and 1150px the wide capture renders under 1000px, where a
     three-panel desktop app stops being an interface and becomes texture.
     OPTIONAL AND NOT YET RENDERED — the template omits the <source> until
     this is a real render, because the wide master has no clean vertical cut
     line and a pixel crop of it slices the chapter header mid-word. Until it
     exists, the narrow detail covers that whole range instead. See the README
     for the capture recipe; it needs museapp.html from the MUSE repo. */
  imageMid: undefined as string | undefined,
  imageMidW: 2000,
  imageMidH: 1250,
} as const

/**
 * The studio index. Deliberately unsorted and uncategorised — the range is
 * meant to show through the projects themselves, so don't group these into
 * sections or the page starts making an argument instead of showing work.
 *
 * To add one: append an object. `kind` is a single mono word (Experiment,
 * Utility, Available, In development). Omit `href` until there is somewhere
 * real to send people; the row then renders without a link or an arrow.
 */
export interface StudioProject {
  name: string
  summary: string
  kind: string
  href?: string
  /* Same field as FEATURED.platforms, so a project promoted to the front of
     the page carries its metadata with it. The index does not render this
     yet — it is deliberately still name / summary / kind until the new
     hierarchy has been judged on its own. */
  platforms?: string[]
}

export const STUDIO_PROJECTS: StudioProject[] = [
  {
    name: 'Bastion',
    summary: 'Security operations toolkit for visibility, response, and control.',
    kind: 'Experiment',
  },
  {
    name: 'Tiny Tools',
    summary: 'Small utilities that solve one thing really well.',
    kind: 'Utility',
  },
]
