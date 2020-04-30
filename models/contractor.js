import { Model } from 'vue-mc'
import User from './user'
import Media from './edia'

export default class Contractor extends Model {
  defaults() {
    return {
      id: null,
      user: new User(),
      photo: new Media()
    }
  }
}
