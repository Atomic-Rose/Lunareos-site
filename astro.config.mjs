import { defineConfig } from 'astro/config'

// GitHub Pages custom domain, served from the root path.
// `format: 'directory'` keeps clean URLs: /privacy/ rather than /privacy.html.
export default defineConfig({
  site: 'https://lunareos.com',
  base: '/',
  build: {
    format: 'directory',
  },
})
