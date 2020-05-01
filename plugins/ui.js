// UI componentes
import Vue from 'vue'
import Carousel from 'vue-carousel'
import Modal from 'vue-js-modal'
import Avatar from 'vue-avatar'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'
import VueSmoothScroll from 'vue2-smooth-scroll'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import { FadeTransition } from 'vue2-transitions'
import FormInput from '@/components/form/input'
import SubmitButton from '@/components/form/submitButton'

Vue.use(Carousel)
Vue.use(Modal)
Vue.use(Vuelidate)
Vue.use(VueMask)
Vue.use(VueSmoothScroll)
Vue.use(PerfectScrollbar)

Vue.component('avatar', Avatar)
Vue.component('form-input', FormInput)
Vue.component('submit-button', SubmitButton)
Vue.component('fade-transition', FadeTransition)
