// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: [
    [
      '@nuxtjs/google-fonts', {
        families: {
          Roboto: [400, 500, 600],
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
  runtimeConfig: {
    public: {
      apiUrl: 'https://odiw5mq8be.execute-api.us-east-1.amazonaws.com',
    }
  }
});
