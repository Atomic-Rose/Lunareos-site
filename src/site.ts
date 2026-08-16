/**
 * Site-wide constants. Anything that appears in more than one place —
 * or that you'd want to change in exactly one place — lives here.
 */

export const SITE = {
  name: 'Lunareos',
  legalName: 'Lunareos LLC',
  url: 'https://atomic-rose.github.io/Lunareos-site',
  email: 'hello@lunareos.com',
  tagline: 'Software · Design · Imagination',
  // Same sentence as the hero lede, verbatim. Keep the two in sync.
  description:
    'Lunareos is an independent studio exploring ideas, problems, and possibilities through software.',
} as const

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

/** Prefix an internal absolute path with Astro's configured deployment base. */
export const withBase = (path: string) => `${base}${path.startsWith('/') ? path : `/${path}`}`

export const FOOTER_LINKS = [
  { label: 'Contact', href: withBase('/#contact') },
  { label: 'Privacy', href: withBase('/privacy/') },
] as const
