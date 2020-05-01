import { Model } from 'vue-mc'

export default class Timeslot extends Model {
  defaults() {
    return {
      id: null,
      start_dt: null,
      end_dt: null,
      type: null
    }
  }
}
