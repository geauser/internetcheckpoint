// https://nuxt.com/docs/api/configuration/nuxt-config

const { NUXT_GA_ID, NUXT_API_URL, NUXT_APP_DOMAIN } = process.env;

export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.includes('media-'),
    }
  },
  css: ['~/assets/css/main.css'],
  modules: [
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
    id: NUXT_GA_ID,
  },
  runtimeConfig: {
    public: {
      appDomain: NUXT_APP_DOMAIN ?? 'internetcheckpoint.page',
      apiUrl: NUXT_API_URL ?? 'https://odiw5mq8be.execute-api.us-east-1.amazonaws.com',
    }
  }
});
