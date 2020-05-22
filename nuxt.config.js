require('dotenv').config()

export default {
  mode: 'universal',
  // mode: 'spa',
  env: {
    baseURL: process.env.BASE_URL,
    fileStackApiKey: process.env.NUXT_ENV_FILESTACK_API_KEY
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
        src:
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyDydTcmc4LkB3Yw2Rn6YUYgYbNF5j6ti5k&libraries=places'
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
    { src: '@/plugins/http' },

    // { src: '@/plugins/ui' },
    { src: '@/plugins/icons' },
    { src: '@/plugins/data' },
    { src: '@/plugins/dictionary' },
    // { src: '@/plugins/full-calendar' },

    { src: '@/plugins/ui', mode: 'client' },
    // { src: '@/plugins/icons', mode: 'client' },
    // { src: '@/plugins/data', mode: 'client' },
    // { src: '@/plugins/dictionary', mode: 'client' },
    { src: '@/plugins/full-calendar', mode: 'client' }
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
    '@nuxtjs/style-resources',
    '@nuxtjs/auth',
    '@nuxtjs/sentry'
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
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL
  },

  auth: {
    scopeKey: 'type',
    strategies: {
      local: {
        token: {
          property: 'token'
        },
        endpoints: {
          login: { url: 'login', method: 'post' },
          logout: { url: 'login', method: 'delete' },
          user: { url: 'validate', method: 'post', propertyName: 'user' }
        }
      }
      // tokenRequired: false,
      // resetOnError: true
    }
  },
  sentry: {
    dsn: 'https://8ef7b2ffff514abc800bcb8685bc5387@o60001.ingest.sentry.io/5250856',
    config: {}
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    optimization: {
      minimize: false
    },

    extend(config, ctx) {}
    // babelrc: true
  }

  // server: {
  //   port: 8000
  // }
}
