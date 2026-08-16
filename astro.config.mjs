import { defineConfig } from 'astro/config'

// GitHub Pages project site. Keep this base in sync with the repository name.
// `format: 'directory'` keeps clean URLs: /privacy/ rather than /privacy.html.
export default defineConfig({
  site: 'https://atomic-rose.github.io',
  base: '/Lunareos-site',
  build: {
    format: 'directory',
  },
})
