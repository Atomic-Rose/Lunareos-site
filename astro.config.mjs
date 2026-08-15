import { defineConfig } from 'astro/config'

// Static site, custom domain at the apex (see public/CNAME).
// `format: 'directory'` keeps clean URLs: /about/ rather than /about.html
export default defineConfig({
  site: 'https://lunareos.com',
  build: {
    format: 'directory',
  },
})
