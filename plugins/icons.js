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
  faUsers,
  faUserFriends,
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
  faList,
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
  faCalendarTimes,
  faDownload,
  faBug,
  faIdCard,
  faSignature,
  faMobileAlt,
  faThumbsUp,
  faExclamationCircle,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faListOl,
  faFistRaised,
  faPlayCircle,
  faStopCircle,
  faChartLine,
  faBullhorn,
  faWrench,
  faEllipsisH
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

const faHandRockNRoll = {
  prefix: 'fas',
  iconName: 'hand-rock-n-roll',
  icon: [
    448,
    448,
    [],
    null,
    'M 255.98 179.735 L 256.616 142.686 C 256.616 133.846 256.459 119.684 247.619 119.684 L 209.89 120.957 C 201.05 120.957 194.526 130.663 194.526 139.503 L 191.98 182.665 C 197 180.885 219.509 182.281 225.139 182.281 L 255.98 179.735 Z M 383.98 275.725 C 383.97 240.385 355.32 211.735 319.99 211.735 L 207.85 211.735 C 199.07 211.735 191.95 218.805 191.95 227.585 L 191.95 228.145 C 194.496 253.778 213.25 275.735 239.52 275.735 L 274.78 275.735 C 284.46 275.735 287.98 279.315 287.98 283.735 L 287.98 299.935 C 287.98 304.225 284.39 307.715 280.1 307.935 C 235.58 310.215 215.94 332.645 184.05 380.485 L 177.74 389.955 C 175.292 393.632 170.325 394.626 166.65 392.175 L 153.34 383.295 C 149.663 380.847 148.669 375.88 151.12 372.205 L 157.43 362.735 C 173.16 339.135 187.63 319.475 204.74 304.655 C 187.47 299.145 177.796 275.076 170.326 258.746 C 171.443 263.869 162.665 339.797 147.183 338.114 L 104.997 335.567 C 84.476 335.567 89.613 264.549 86.366 256.879 C 77.846 264.559 60.33 275.735 48 275.735 L 16 275.735 C 10.36 275.735 5.03 274.585 0 272.785 L 0 350.715 C 0 384.665 13.48 417.215 37.49 441.225 L 63.99 467.735 L 63.99 531.735 L 319.97 531.735 L 319.97 467.775 L 355.88 431.855 C 373.888 413.843 384.003 389.415 384 363.945 L 383.98 275.725 Z M 351.97 185.635 L 351.97 67.735 C 351.97 58.895 351.176 3.352 342.336 3.352 L 298.877 3.353 C 290.037 3.353 287.97 58.895 287.97 67.735 L 287.97 179.735 L 319.97 179.735 C 331.25 179.735 341.91 182.045 351.97 185.635 Z M 16.637 278.749 L 49.91 281.296 C 58.75 281.296 64 281.138 64 272.298 L 60.817 130.929 C 60.817 122.089 60.66 88.828 51.82 88.828 L 15.363 87.555 C 6.523 87.555 4.456 122.726 4.456 131.566 L 0 280.574 C 0 289.414 7.797 278.749 16.637 278.749 Z M 104.35 319.493 L 145.263 321.402 C 154.103 321.402 159.99 236.575 159.99 227.735 L 159.99 171.503 C 159.99 162.663 154.103 152.958 145.263 152.958 L 117.083 152.957 C 108.243 152.957 97.263 161.39 97.263 170.23 L 95.99 227.735 C 95.99 236.575 95.51 319.493 104.35 319.493 Z'
  ]
}

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
  faUsers,
  faUserFriends,
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
  faList,
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
  faCalendarTimes,
  faDownload,
  faBug,
  faIdCard,
  faSignature,
  faMobileAlt,
  faThumbsUp,
  faExclamationCircle,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faListOl,
  faFistRaised,
  faHandRockNRoll,
  faPlayCircle,
  faStopCircle,
  faChartLine,
  faBullhorn,
  faWrench,
  faEllipsisH
)

Vue.component('font-awesome', FontAwesomeIcon)
