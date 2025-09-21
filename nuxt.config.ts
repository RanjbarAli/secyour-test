// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  build: {
    transpile: ['drawflow'],
  },

  plugins: [
    '~/plugins/app-service-provider.js',
    '~/plugins/click-outside.client.js',
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@pinia/nuxt'
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger']
    },
  },
  
  css: [
    '~/assets/css/main.css'
  ],


  components: {
    global: true,
    dirs: ['~/components','~/components/icons']
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },

  runtimeConfig: {
    public: {
      SITE_URL: import.meta.env.SITE_URL,
      API_BASE_URL: import.meta.env.API_BASE_URL,
    },
  },

  routeRules: {
    '/panel/**' : { ssr: false },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      link: [
/*         { rel: 'icon', type: 'image/ico', href: '/32x32-favicon.ico', sizes: '32x32' },
        { rel: 'apple-touch-icon', type: 'image/ico', href: '/180x180-favicon.ico', sizes: '180x180' },
        { rel: 'icon', type: 'image/ico', href: '/192x192-favicon.ico', sizes: '192x192' },
        { rel: 'icon', type: 'image/ico', href: '/360x360-favicon.ico', sizes: '360x360' }, */
      ],
      script: [
        {
          src: '/js/drawflow.min.js',
          defer: false,
          type: 'text/javascript'
        }
      ],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        },
        { name:"apple-mobile-web-app-capable", content:"yes" },
        { name:"apple-mobile-web-app-title", content:"سکیور" },
        { property: 'og:title', content: 'سکیور' },
        { name:"apple-mobile-web-app-orientations", content:"portrait-any" },
        { name:"apple-mobile-web-app-capable", content:"yes" },
      ]
    }
  },

  ssr: import.meta.env.NODE_ENV !== "development",
})