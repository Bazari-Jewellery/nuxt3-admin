// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  sourcemap: {
    client: true,

  },
  css: ['~/assets/css/main.css'],
  app: {
    // baseURL: '/orders',
    buildAssetsDir: '_cybandy',
    head: {
      titleTemplate: "%s %separator Bazari Wholesale",
      templateParams: {
        separator: "|",
      },
    },
  },
  runtimeConfig: {
    medusaBackendUrl: process.env.MEDUSA_URL,
    public: {
      medusaBackendUrl: process.env.MEDUSA_URL,
      env: process.env.NODE_ENV,
      under_construction: process.env.UNDER_CONSTRUCTION
    },
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-security',
    '@nuxtjs/seo',
    'nuxt-bugsnag',
    '@pinia/nuxt',
  ],
  ui: {
    icons: ['ph', 'heroicons', 'carbon']
  },
  image: {
    inject: true,
    dir: 'assets/images',
    format: ['webp', 'avif', 'png'],
    domains: [process.env.MEDUSA_URL as string, 'wsrv.nl', 's3.bazari.it'],
    presets: {
      prod_small_thumbnail: {
        modifiers: {
          format: 'webp',
          width: 150,
          height: 150,
          fit: 'fill'
        }
      },
      prod_tiny_thumbnail: {
        modifiers: {
          format: 'webp',
          width: 36,
          height: 48,
          fit: 'fill'
        }
      },
    },
    weserv: {
      baseURL: process.env.NODE_ENV === 'production' ? 'https://dash.bazari.it' : "http://localhost:3000"
    }
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      contentSecurityPolicy: {
        "img-src": ["'self'", "data:", "https://wsrv.nl", "https://flagcdn.com", 'blob:'],
        "object-src": [process.env.MEDUSA_URL || 'https://backend.bazari.it', "https://flagcdn.com"],
        // "script-src": ["'self'", "https://cdn.tiny.cloud/1/nehb99vk9dk4g39dss7owr2gjh921nny8rxkmb31rftjbzzy/tinymce/6/tinymce.min.js"]
      },
      crossOriginResourcePolicy: process.env.NODE_ENV === 'development' ? 'cross-origin' : 'same-origin'
    }
  },
  site: {
    indexable: false,
    name: 'Bazari Wholesale Dashboard',
    description: "Dashboard application",
    defaultLocale: "en",
  },
  ogImage: { enabled: false },
  schemaOrg: {
    enabled: false
  },
  experimental: {
    inlineRouteRules: true
  },
})
