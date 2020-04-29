import { Model } from 'vue-mc'

export default class BaseModel extends Model {
  defaults() {
    return {
      id: null,
      created_dt: null,
      updated_dt: null,
      deleted_dt: null
    }
  }
}
