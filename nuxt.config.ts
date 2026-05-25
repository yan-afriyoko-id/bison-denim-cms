// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  srcDir: 'app',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@pinia/nuxt'
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true
    },
  },
  
  css: [
    '@/assets/css/tailwind.css'
  ],
  
  app: {
    head: {
      htmlAttrs: {
        lang: 'id'
      },
      title: 'Bison Denim',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Bison Denim - Toko Furnitur Online Terpercaya' },
        { property: 'og:image', content: '/assets/img/images.png' },
        { property: 'og:title', content: 'Bison Denim' },
        { property: 'og:description', content: 'Bison Denim - Toko Furnitur Online Terpercaya' }
      ],
      link: [
        // Favicons
        { rel: 'icon', type: 'image/x-icon', href: '/assets/img/images.png' },
        { rel: 'apple-touch-icon', href: '/assets/img/images.png' },
        
        // Google Fonts
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i' }
        
      ]
    }
  },
  components: true
})