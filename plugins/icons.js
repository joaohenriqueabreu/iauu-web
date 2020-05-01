import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

// Example importing for all libs
// import { faCoffee as fasCoffee } from '@fortawesome/pro-solid-svg-icons'
// import { faCoffee as farCoffee } from '@fortawesome/pro-regular-svg-icons'
// import { faCoffee as falCoffee } from '@fortawesome/pro-light-svg-icons'
// import { faCoffee as fadCoffee } from '@fortawesome/pro-duotone-svg-icons'

library.add(faCalendar)

Vue.component('font-awesome', FontAwesomeIcon)
Vue.config.productionTip = false
