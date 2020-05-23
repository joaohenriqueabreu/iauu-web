import { Model } from 'vue-mc'
import User from './user'
import Media from './media'

export default class Artist extends Model {
  defaults() {
    return {
      id: null,
      user: new User(),
      name: '',
      company_name: '',
      is_verified: '',
      photo: new Media(),
      ratings: [],
      medias: []
    }
  }
}
