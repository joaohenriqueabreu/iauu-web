import array from 'lodash/array'
import collection from 'lodash/collection'
import clone from 'lodash/cloneDeep'

export default ({ app }, inject) => {
  inject('array', array)
  inject('collection', collection)
  inject('object', { clone })
}
