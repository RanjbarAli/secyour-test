// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    enabled: true,
    timeline: {
        enabled: false,
      }
    },

  components: {
    global: true,
    dirs: ['~/components','~/components/icons']
  },

  alias: {
    "@": "/"+__dirname,
  },

  routeRules: {
    '/panel/**' : { ssr: false },
    
  },

  runtimeConfig: {
    public: {
      SITE_URL: process.env.SITE_URL,
      RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,
      API_BASE_URL: process.env.API_BASE_URL,
      API_REGISTER: process.env.API_PUT_REGISTER,
      API_LOGIN: process.env.API_POST_LOGIN,
      API_USER: process.env.API_GET_USER,
      API_REMOVE_AVATAR: process.env.API_DELETE_REMOVE_AVATAR,
      API_SEND_EMAIL_VERIFACTION: process.env.API_POST_SEND_EMAIL_VERIFACTION,
      API_UPDATE_USER: process.env.API_PATCH_UPDATE_USER,
      API_VERIFY_PHONE: process.env.API_POST_VERIFY_PHONE,
      API_SEND_PHONE_VERIFACTION: process.env.API_POST_SEND_PHONE_VERIFACTION,
      API_CHANGE_PASSWORD: process.env.API_POST_CHANGE_PASSWORD,
      API_LOGOUT: process.env.API_POST_LOGOUT,
      API_DASHBOARD_DETAILS: process.env.API_GET_DASHBOARD_DETAILS,
      API_FORGET_PASSWORD: process.env.API_POST_FORGET_PASSWORD,
      API_RESET_PASSWORD_TOKEN_CHECK: process.env.API_POST_RESET_PASSWORD_TOKEN_CHECK,
      API_RESET_PASSWORD: process.env.API_POST_RESET_PASSWORD,
      API_FREE_SCAN: process.env.API_POST_FREE_SCAN,
      API_SCAN_CHECK: process.env.API_POST_SCAN_CHECK,
      API_SCAN_DETAILS: process.env.API_GET_SCAN_DETAILS,
      API_TICKETS_LIST: process.env.API_GET_TICKETS_LIST,
      API_TICKET_SUBJECTS_LIST: process.env.API_GET_TICKET_SUBJECTS_LIST,
      API_CLOSE_TICKET: process.env.API_PATCH_CLOSE_TICKET,
      API_NEW_TICKET: process.env.API_PUT_NEW_TICKET,
      API_FAQS_RELATED: process.env.API_GET_FAQS_RELATED,
      API_GET_TICKET: process.env.API_POST_GET_TICKET,
      API_REPLY_TICKET: process.env.API_POST_REPLY_TICKET,
      API_MONITORED_SITES: process.env.API_GET_MONITORED_SITES,
      API_MONITORED_SITE: process.env.API_GET_MONITORED_SITE,
      API_CHANGE_MONITORED_SITES_SCAN_INTERVAL: process.env.API_POST_CHANGE_MONITORED_SITES_SCAN_INTERVAL,
      API_ADD_ORGANIZATIONS_EMAIL: process.env.API_PUT_ADD_ORGANIZATIONS_EMAIL,
      API_GET_ORGANIZATIONS_EMAIL: process.env.API_GET_ORGANIZATIONS_EMAIL,
      API_INCREASE_MONEY: process.env.API_POST_INCREASE_MONEY,
      API_SUBSCRIBE_PLAN: process.env.API_POST_SUBSCRIBE_PLAN,
      API_GET_SUBSCRIPTION_DAYS_LEFT: process.env.API_GET_SUBSCRIPTION_DAYS_LEFT,
      API_SCAN_SITE: process.env.API_POST_SCAN_SITE,
      API_NOTIFICATIONS: process.env.API_GET_NOTIFICATIONS,
      API_PANEL_NAV_DETAILS: process.env.API_GET_PANEL_NAV_DETAILS,
      API_CONTACT: process.env.API_PUT_CONTACT,
    }
  },

  modules: ['@pinia/nuxt', '@nuxtjs/color-mode'],

  colorMode: {
          preference: 'light',
          fallback: 'light',
          classSuffix: ''
  },

  plugins: [
        '~/plugins/app-service.js',
        '~/plugins/click-outside.js',
        '~/plugins/re-captcha.js',
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      script: [
        { src: '/js/main.js' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  ssr: process.env.NODE_ENV !== "development",
  compatibilityDate: '2024-11-13',
})