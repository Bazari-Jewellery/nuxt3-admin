// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr:false,
  sourcemap:{
    client:true,
    
  },
  css: ['~/assets/css/main.css'],
  app:{
    // baseURL: '/orders',
    buildAssetsDir:'_cybandy'
  },
  runtimeConfig: {
    medusaBackendUrl: process.env.MEDUSA_URL,
    public: {
      medusaBackendUrl: process.env.MEDUSA_URL,
      cyStripePk: process.env.STRIPE_API_PK
    },
    jwt_secret: process.env.JWT_SECRET,
    account_req_secret: process.env.ACCOUNT_REQUEST_TOKEN_SECRET
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@vueuse/nuxt',
    // '@nuxtjs/html-validator',
  ],
  ui: {
    icons: ['ph', 'heroicons', 'carbon']
  },
  image: {
    inject: true,
    dir: 'assets/images',
    format: ['webp', 'avif', 'png'],
    domains: [process.env.MEDUSA_URL as string],
    presets: {
      prod_small_thumbnail: {
        modifiers: {
          format: 'webp',
          width: 150,
          height: 150,
          fit:'fill'
        }
      },
      prod_tiny_thumbnail: {
        modifiers: {
          format: 'webp',
          width: 36,
          height: 48,
          fit:'fill'
        }
      },
    }
  },
  experimental:{
    inlineRouteRules: true
   },
})
