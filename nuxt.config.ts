// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  sourcemap: {
    client: true,

  },
  devServer: {
    host: 'admin.bazari.local',
    port: 443,
    https: {
      cert: "./ssl/admin.bazari.local.pem",
      key: "./ssl/admin.bazari.local-key.pem"
    }
  },
  css: ['~/assets/css/main.css'],
  app: {
    // baseURL: '/orders',
    buildAssetsDir: '_cybandy',
    head: {
      script: [
        // {
        //   src: "https://cdn.tiny.cloud/1/nehb99vk9dk4g39dss7owr2gjh921nny8rxkmb31rftjbzzy/tinymce/6/tinymce.min.js",
        //   referrerpolicy: "origin",
        //   crossorigin: "anonymous",
        //   defer: true
        // }
      ]
    }
  },
  runtimeConfig: {
    medusaBackendUrl: process.env.MEDUSA_URL,
    public: {
      medusaBackendUrl: process.env.MEDUSA_URL,
      cyStripePk: process.env.STRIPE_API_PK,
      env: process.env.NODE_ENV,
      under_construction: process.env.UNDER_CONSTRUCTION
    },
    jwt_secret: process.env.JWT_SECRET,
    account_req_secret: process.env.ACCOUNT_REQUEST_TOKEN_SECRET
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-security',
    '@nuxtjs/seo',
    'nuxt-bugsnag',
    // '@nuxtjs/html-validator',
  ],
  ui: {
    icons: ['ph', 'heroicons', 'carbon']
  },
  image: {
    inject: true,
    dir: 'assets/images',
    format: ['webp', 'avif', 'png'],
    domains: [process.env.MEDUSA_URL as string, process.env.DO_SPACES_IMAGES_BUCKET as string],
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
      baseURL: process.env.NODE_ENV === 'production' ? 'https://bash.bazari.it' : "http://localhost:3000"
    }
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      contentSecurityPolicy: {
        "img-src": ["'self'", "data:", "https://wsrv.nl", "https://flagcdn.com", process.env.DO_SPACES_IMAGES_BUCKET as string],
        "object-src": [process.env.MEDUSA_URL || 'https://backend.bazari.it', "https://flagcdn.com"],
        // "script-src": ["'self'", "https://cdn.tiny.cloud/1/nehb99vk9dk4g39dss7owr2gjh921nny8rxkmb31rftjbzzy/tinymce/6/tinymce.min.js"]
      },
      crossOriginResourcePolicy: process.env.NODE_ENV === 'development' ? 'cross-origin' : 'same-origin'
    }
  },
  site: {
    indexable: false
  },
  ogImage: { enabled: false },
  experimental: {
    inlineRouteRules: true
  },
})
