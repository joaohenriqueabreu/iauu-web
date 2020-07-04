import Vue from 'vue'
import array from 'lodash/array'
import collection from 'lodash/collection'
import math from 'lodash/math'
import clone from 'lodash/cloneDeep'
import moment from 'moment'
import VueFilters from 'vue2-filters'

Vue.use(VueFilters, {
  number: { thousandsSeparator: '.', decimalSeparator: ',' },
  currency: { symbol: 'R$ ', thousandsSeparator: '.', decimalSeparator: ',' }
})

// Custom filters
const dateFilter = (value) => {
  return moment(value).format('DD/MM/YYYY')
}

const datetimeFilter = (value) => {
  return moment(value).format('DD/MM/YYYY HH:mm')
}

const timeFilter = (value) => {
  return moment(value).format('HH:mm')
}

// Registering custom filters
Vue.filter('date', dateFilter)
Vue.filter('datetime', datetimeFilter)
Vue.filter('time', timeFilter)

export default ({ app }, inject) => {
  inject('array', array)
  inject('collection', collection)
  inject('math', math)
  inject('object', { clone })
  inject('moment', moment)
}
