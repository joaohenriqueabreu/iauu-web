import BaseModel from './base'
import User from './user'
import Media from './media'

export default class Contractor extends BaseModel {
  defaults() {
    return {
      user: new User(),
      photo: new Media()
    }
  }
}
