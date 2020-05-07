import array from 'lodash/array'

export default ({ app }, inject) => {
  inject('array', array)
}
