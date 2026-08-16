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
  description:
    'Lunareos is an independent studio that builds its own software. We make our own products, and they don’t all belong to the same industry.',
} as const

export const FOOTER_LINKS = [
  { label: 'Contact', href: '/#contact' },
  { label: 'Privacy', href: '/privacy/' },
] as const
