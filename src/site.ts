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
    'Lunareos is an independent software studio building specialized tools, engineered properly for the work they support.',
} as const

export const NAV = [
  { label: 'Studio', href: '/#studio' },
  { label: 'Contact', href: '/#contact' },
] as const

export const FOOTER_LINKS = [
  { label: 'Studio', href: '/#studio' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Privacy', href: '/privacy/' },
] as const
