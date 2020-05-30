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
  faPiggyBank,
  faInfo,
  faExclamation,
  faPlus,
  faPencilAlt,
  faReceipt,
  faGuitar,
  faArrowDown,
  faSortAlphaDown,
  faEnvelope,
  faChild,
  faGrinStars,
  faFrown,
  faShoppingCart,
  faTimesCircle,
  faCalendarTimes
} from '@fortawesome/free-solid-svg-icons'
import {
  faEnvelope as farEnvelope,
  faStar as farStar,
  faComment,
  faQuestionCircle,
  faFrown as farFrown
} from '@fortawesome/free-regular-svg-icons'
import {
  faGoogle,
  faFacebook,
  faInstagram,
  faPinterest,
  faWhatsapp,
  faLinkedin,
  faSpotify,
  faYoutube,
  faProductHunt
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
  faSpotify,
  faYoutube,
  faProductHunt,
  faPhotoVideo,
  faComment,
  faQuestionCircle,
  faHeart,
  farFrown,
  faMusic,
  faSearchDollar,
  faClock,
  faDollarSign,
  faPiggyBank,
  faInfo,
  faExclamation,
  faPlus,
  faPencilAlt,
  faReceipt,
  faGuitar,
  faArrowDown,
  faSortAlphaDown,
  farEnvelope,
  faChild,
  faGrinStars,
  faFrown,
  faShoppingCart,
  faTimesCircle,
  faCalendarTimes
)

Vue.component('font-awesome', FontAwesomeIcon)
