import { Model } from 'vue-mc'

export default class Product extends Model {
  defaults() {
    return {
      id: null,
      name: '',
      description: '',
      price: 0,
      duration: 0
    }
  }
}
