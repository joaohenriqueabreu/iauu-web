import { Model } from 'vue-mc'
import Artist from './artist'
import Contractor from './contractor'
import Timeslot from './timeslot'

export default class Presentation extends Model {
  defaults() {
    return {
      id: null,
      status: null,
      artist: new Artist(),
      contractor: new Contractor(),
      timeslot: new Timeslot()
    }
  }
}
