import BaseModel from './base'
import User from './user'
import Media from './media'

export default class Artist extends BaseModel {
  defaults() {
    return {
      user: new User(),
      name: '',
      company_name: '',
      is_verified: '',
      photo: new Media(),
      ratings: []
    }
  }
}
