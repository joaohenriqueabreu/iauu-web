import array from 'lodash/array'
import collection from 'lodash/collection'

export default ({ app }, inject) => {
  inject('array', array)
  inject('collection', collection)
}
