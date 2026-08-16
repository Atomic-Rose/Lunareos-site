/**
 * Site-wide constants. Anything that appears in more than one place —
 * or that you'd want to change in exactly one place — lives here.
 */

export const SITE = {
  name: 'Lunareos',
  legalName: 'Lunareos LLC',
  url: 'https://lunareos.com',
  email: 'hello@lunareos.com',
  tagline: 'Software · Design · Imagination',
  // Same sentence as the hero lede, verbatim. Keep the two in sync.
  description:
    'Lunareos is an independent studio exploring ideas, problems, and possibilities through software.',
} as const

export const FOOTER_LINKS = [
  { label: 'Contact', href: '/#contact' },
  { label: 'Privacy', href: '/privacy/' },
] as const
