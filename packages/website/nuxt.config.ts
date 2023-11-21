// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "node:path";


export default defineNuxtConfig({

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.includes('media-'),
    }
  },

  alias: {
    '@internetcheckpoint/functions': path.resolve(__dirname, '../functions/src'),
  },

  css: [
    '~/assets/css/transitions.css',
    '~/assets/css/animations.css',
    '~/assets/css/main.css'
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-gtag',
    [
      '@nuxtjs/google-fonts', {
        families: {
          Roboto: [400, 500, 600, 700],
        },
        display: 'swap',
        prefetch: true,
      }
    ]
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  gtag: {
    id: process.env.NUXT_GA_ID,
  },
  runtimeConfig: {
    public: {
      stage:          process.env.NUXT_STAGE,
      appDomain:      process.env.NUXT_APP_DOMAIN ?? 'internetcheckpoint.page',
      apiUrl:         process.env.NUXT_API_URL ?? 'https://odiw5mq8be.execute-api.us-east-1.amazonaws.com',
      firebaseConfig: process.env.NUXT_FIREBASE_CONFIG,
    }
  }
});
