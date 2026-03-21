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
        {
          src: 'https://analytics.umami.is/script.js',
          'data-website-id': 'd13e2566-5fbc-4feb-ac17-92ec097666cd',
          defer: true,
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://www.wadocoaching.com/#organization',
            'name': 'WadoCoaching',
            'url': 'https://www.wadocoaching.com',
            'logo': 'https://www.wadocoaching.com/images/logo.svg',
            'description': 'Cabinet de coaching professionnel certifié ACC/ICF. Coaching individuel, coaching d\'équipe et ateliers de pratiques réflexives.',
            'email': 'mehdi@wadocoaching.com',
            'areaServed': { '@type': 'Country', 'name': 'France' },
            'founder': { '@type': 'Person', '@id': 'https://www.wadocoaching.com/qui-suis-je/#person' },
          }),
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
