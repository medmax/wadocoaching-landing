import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  devServer: {
    port: 5173,
  },

  experimental: {
    watcher: 'parcel',
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/.nuxt/**', '**/.output/**'],
      },
    },
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://assets.calendly.com/assets/external/widget.css',
        },
      ],
      script: [
        {
          src: 'https://assets.calendly.com/assets/external/widget.js',
          async: true,
        },
        { src: '/calendly.js', defer: true },
        // Umami Analytics (cookieless — remplace GA4)
        // Remplace YOUR_UMAMI_WEBSITE_ID par ton ID depuis le dashboard Umami
        {
          src: 'https://analytics.umami.is/script.js',
          'data-website-id': 'd13e2566-5fbc-4feb-ac17-92ec097666cd',
          defer: true,
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      sanityProjectId: process.env.VITE_SANITY_PROJECT_ID ?? '',
      sanityDataset: process.env.VITE_SANITY_DATASET ?? 'production',
    },
  },
})
