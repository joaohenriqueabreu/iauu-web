import BaseModel from './base'

export default class Media extends BaseModel {
  defaults() {
    return {
      type: '',
      name: '',
      subtitle: '',
      url: '',
      thumb: '',
      size: 0
    }
  }
}
