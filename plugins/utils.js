import pluralize from 'pluralize'

const utils = {
  pluralize: (value, count) => pluralize(value, count)
}

export default ({ app }, inject) => {
  inject('utils', utils)
}
