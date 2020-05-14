// UI componentes
import Vue from 'vue'
import Carousel from 'vue-carousel'
import Avatar from 'vue-avatar'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'
import VueSmoothScroll from 'vue2-smooth-scroll'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import { FadeTransition, SlideYDownTransition } from 'vue2-transitions'
import VueModal from 'vue-js-modal'
import VueSweetalert2 from 'vue-sweetalert2'
import { ToggleButton } from 'vue-js-toggle-button'
import moment from 'moment'

// Form components
import Modal from '@/components/layout/modal'
import AlertMessage from '@/components/layout/alert'
import Overlay from '@/components/layout/overlay'
import StatsDonut from '@/components/layout/statsDonut'
import MediaThumbnail from '@/components/media/thumbnail'

import FormInput from '@/components/form/input'
import FormSelect from '@/components/form/select'
import FormToggle from '@/components/form/toggle'
import ImageUploader from '@/components/form/imageUploader'
import SubmitButton from '@/components/form/submitButton'

moment.locale('pt-br')

Vue.use(Carousel)
Vue.use(Modal)
Vue.use(Vuelidate)
Vue.use(VueMask)
Vue.use(VueSmoothScroll)
Vue.use(PerfectScrollbar)
Vue.use(VueSweetalert2)
Vue.use(VueModal, { componentName: 'v-modal' })

Vue.component('avatar', Avatar)

Vue.component('toggle-button', ToggleButton)
Vue.component('overlay', Overlay)
Vue.component('form-input', FormInput)
Vue.component('form-select', FormSelect)
Vue.component('form-toggle', FormToggle)
Vue.component('image-uploader', ImageUploader)
Vue.component('submit-button', SubmitButton)
Vue.component('fade-transition', FadeTransition)
Vue.component('slide-down-transition', SlideYDownTransition)
Vue.component('modal', Modal)
Vue.component('alert', AlertMessage)
Vue.component('stats-donut', StatsDonut)
Vue.component('media-thumbnail', MediaThumbnail)

Vue.prototype.moment = moment
Vue.prototype.delay = setTimeout(() => {}, 500)
