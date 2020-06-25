require('dotenv').config()

export default {
  mode: 'universal',
  // mode: 'spa',
  env: {
    baseURL: process.env.BASE_URL,
    fileStackApiKey: process.env.FILESTACK_API_KEY
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_description || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-vue/dist/bootstrap-vue.css',
    'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css',
    'selectize/dist/css/selectize.bootstrap3.css'
  ],
  styleResources: {
    scss: [
      '@/assets/scss/lib/_transitions.scss',
      '@/assets/scss/lib/_fonts.scss',
      '@/assets/scss/lib/_colors.scss',
      '@/assets/scss/lib/_variables.scss',
      '@/assets/scss/lib/_responsive.scss',
      'bootstrap/scss/bootstrap',
      '@/assets/scss/main.scss'
    ]
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/config' },
    { src: '@/plugins/utils' },
    // { src: '@/plugins/http' },
    // { src: '@/plugins/auth' },

    // { src: '@/plugins/ui' },
    { src: '@/plugins/icons' },
    { src: '@/plugins/data' },
    { src: '@/plugins/dictionary' },
    // { src: '@/plugins/full-calendar' },

    { src: '@/plugins/ui', mode: 'client' },
    // { src: '@/plugins/icons', mode: 'client' },
    // { src: '@/plugins/data', mode: 'client' },
    // { src: '@/plugins/dictionary', mode: 'client' },
    { src: '@/plugins/full-calendar', mode: 'client' },
    { src: '@/plugins/html2canvas', mode: 'client' }
    // { src: '@/plugins/full-calendar', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@aceforth/nuxt-optimized-images'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // '@nuxtjs/proxy',
    '@nuxtjs/auth',
    '@nuxtjs/style-resources',
    '@nuxtjs/sentry',
    '@nuxtjs/toast'
  ],
  optimizedImages: {
    optimizeImages: true,
    defaultImageLoader: 'img-loader',
    optipng: {
      optimizationLevel: 3
    },
    webp: {
      preset: 'default',
      quality: 75
    }
  },
  axios: {
    baseURL: process.env.API_URL,
    headers: {
      common: {
        Origin: 'web'
      }
    }
  },
  auth: {
    scopeKey: 'role',
    strategies: {
      facebook: {
        // response_type: 'code', // Use auth code flow
        client_id: '287912642575620',
        // client_secret: 'fad1ae1a1577baeabe6d594fce0e245d',
        // access_token_endpoint: 'http://localhost:4444/login/facebook',
        userinfo_endpoint: `${process.env.API_URL}/login/facebook`,
        scope: ['public_profile', 'email', 'user_birthday']
      },
      google: {
        // response_type: 'code', // Use auth code flow
        client_id: '347826395880-9mu706am7qkpont74ecq0d9unr6k0q5u.apps.googleusercontent.com',
        // client_secret: 'fad1ae1a1577baeabe6d594fce0e245d',
        // access_token_endpoint: 'http://localhost:4444/login/facebook',
        userinfo_endpoint: `${process.env.API_URL}/login/google`
        // scope: ['public_profile', 'email', 'user_birthday']
      },
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: false },
          logout: { url: 'login', method: 'delete' },
          user: { url: 'validate', method: 'post', propertyName: false }
        }
      }
      // tokenRequired: false,
      // tokenName: 'Authorization',
      // tokenType: 'bearer',
      // globalToken: true
    }
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    config: {}
  },
  toast: {
    position: 'bottom-left',
    duration: 5000,
    containerClass: 'toast-container',
    iconPack: 'fontawesome'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */

    extend(config, ctx) {}
    // babelrc: true
  }

  // server: {
  // port: 3333
  // host: '0.0.0.0'
  // }
}
