export default defineNuxtConfig({
  modules: [
    // https://github.com/nuxt-modules/supabase
    '@nuxtjs/supabase',
    // UI lib (will be soon open sourced)
    '@nuxthq/ui',
    // https://github.com/nuxt-modules/color-mode
    '@nuxtjs/color-mode',
    // Tailwind CSS
    '@nuxtjs/tailwindcss',
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'https://todo-app-front-end-dev.vercel.app'
    }
  },
  ui: {
    colors: {
      primary: 'green'
    },
    icons: ['mdi', 'heroicons', 'heroicons-outline']
  },
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm'
    }
  }
})
