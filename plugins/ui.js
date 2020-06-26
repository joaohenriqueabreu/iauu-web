// UI componentes
import Vue from 'vue'
import Carousel from 'vue-carousel'
import Avatar from 'vue-avatar'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import VueSmoothScroll from 'vue2-smooth-scroll'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import { FadeTransition, SlideYDownTransition } from 'vue2-transitions'
import VueModal from 'vue-js-modal'
import VueSweetalert2 from 'vue-sweetalert2'
import { ToggleButton } from 'vue-js-toggle-button'
import LinkPrevue from 'link-prevue'
import moment from 'moment'

// Form components
import Logo from '@/components/layout/logo'
import Modal from '@/components/layout/modal'
import AlertMessage from '@/components/layout/alert'
import Overlay from '@/components/layout/overlay'
import Loading from '@/components/layout/loading'
import StatsDonut from '@/components/layout/statsDonut'
import MediaThumbnail from '@/components/media/thumbnail'
import Rating from '@/components/artist/profile/rating'

import FormInput from '@/components/form/input'
import FormNumeric from '@/components/form/numeric'
import FormPassword from '@/components/form/password'
import FormEmail from '@/components/form/email'
import FormMasked from '@/components/form/masked'
import FormMoney from '@/components/form/money'
import FormTime from '@/components/form/time'
import FormRange from '@/components/form/range'
import FormDate from '@/components/form/date'
import FormTextarea from '@/components/form/textarea'
import FormLocation from '@/components/form/location'
import FormSelect from '@/components/form/select'
import FormToggle from '@/components/form/toggle'
import FormValidation from '@/components/form/validation'

import Button from '@/components/form/button'
import ImageUploader from '@/components/form/imageUploader'
import FileUploader from '@/components/form/fileUploader'
import Attachment from '@/components/form/attachment'

moment.locale('pt-br')

Vue.use(Carousel)
Vue.use(Modal)
Vue.use(Vuelidate)
Vue.use(VueSmoothScroll)
Vue.use(PerfectScrollbar)
Vue.use(VueSweetalert2)
Vue.use(VueModal, { componentName: 'v-modal' })
Vue.use(VueTheMask)

Vue.component('logo', Logo)
Vue.component('avatar', Avatar)
Vue.component('toggle-button', ToggleButton)
Vue.component('overlay', Overlay)
Vue.component('loading', Loading)

Vue.component('form-input', FormInput)
Vue.component('form-numeric', FormNumeric)
Vue.component('form-password', FormPassword)
Vue.component('form-textarea', FormTextarea)
Vue.component('form-email', FormEmail)
Vue.component('form-masked', FormMasked)
Vue.component('form-time', FormTime)
Vue.component('form-date', FormDate)
Vue.component('form-money', FormMoney)
Vue.component('form-location', FormLocation)
Vue.component('form-select', FormSelect)
Vue.component('form-toggle', FormToggle)
Vue.component('form-range', FormRange)
Vue.component('form-validation', FormValidation)
Vue.component('form-button', Button)

Vue.component('image-uploader', ImageUploader)
Vue.component('file-uploader', FileUploader)
Vue.component('fade-transition', FadeTransition)
Vue.component('slide-down-transition', SlideYDownTransition)
Vue.component('link-preview', LinkPrevue)
Vue.component('modal', Modal)
Vue.component('alert', AlertMessage)
Vue.component('stats-donut', StatsDonut)
Vue.component('media-thumbnail', MediaThumbnail)
Vue.component('attachment', Attachment)
Vue.component('rating', Rating)

Vue.prototype.moment = moment
Vue.prototype.delay = setTimeout(() => {}, 500)
