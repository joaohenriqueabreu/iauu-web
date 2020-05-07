import Vue from 'vue'

// Font awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCalendarAlt,
  faUserSecret,
  faSearch,
  faBars,
  faTimes,
  faHome,
  faMapMarkerAlt,
  faCoffee,
  faUser,
  faSignOutAlt,
  faProjectDiagram,
  faRuler,
  faRulerHorizontal,
  faRulerVertical,
  faEdit,
  faPhone,
  faImages,
  faCamera,
  faVideo,
  faArrowCircleUp,
  faCheck,
  faCheckCircle,
  faAngleUp,
  faAngleDown,
  faPaperPlane,
  faPaperclip,
  faLock,
  faStar,
  faStarHalfAlt,
  faArrowRight,
  faArrowLeft,
  faClipboardCheck,
  faTools,
  faListUl,
  faPhotoVideo,
  faHeart,
  faMusic,
  faSearchDollar,
  faClock,
  faDollarSign,
  faPiggyBank
} from '@fortawesome/free-solid-svg-icons'
import {
  faEnvelope,
  faStar as farStar,
  faComment,
  faQuestionCircle,
  faFrown
} from '@fortawesome/free-regular-svg-icons'
import {
  faGoogle,
  faFacebook,
  faInstagram,
  faPinterest,
  faWhatsapp,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Example importing for all libs
// import { faCoffee as fasCoffee } from '@fortawesome/pro-solid-svg-icons'
// import { faCoffee as farCoffee } from '@fortawesome/pro-regular-svg-icons'
// import { faCoffee as falCoffee } from '@fortawesome/pro-light-svg-icons'
// import { faCoffee as fadCoffee } from '@fortawesome/pro-duotone-svg-icons'

library.add(
  faCalendarAlt,
  faUserSecret,
  faSearch,
  faBars,
  faTimes,
  faHome,
  faMapMarkerAlt,
  faCoffee,
  faUser,
  faSignOutAlt,
  faProjectDiagram,
  faRuler,
  faRulerHorizontal,
  faRulerVertical,
  faEnvelope,
  faPhone,
  faEdit,
  faCamera,
  faImages,
  faVideo,
  faArrowCircleUp,
  faAngleUp,
  faAngleDown,
  faPaperPlane,
  faPaperclip,
  faLock,
  faStar,
  farStar,
  faStarHalfAlt,
  faCheck,
  faCheckCircle,
  faArrowRight,
  faArrowLeft,
  faClipboardCheck,
  faTools,
  faListUl,
  faInstagram,
  faGoogle,
  faLinkedin,
  faFacebook,
  faPinterest,
  faWhatsapp,
  faPhotoVideo,
  faComment,
  faQuestionCircle,
  faHeart,
  faFrown,
  faMusic,
  faSearchDollar,
  faClock,
  faDollarSign,
  faPiggyBank
)

Vue.component('font-awesome', FontAwesomeIcon)
