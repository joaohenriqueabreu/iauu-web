import { Model } from 'vue-mc'
import Artist from './artist'
import Contractor from './contractor'
import Proposal from './proposal'
import Timeslot from './timeslot'

export default class Presentation extends Model {
  defaults() {
    return {
      id: null,
      artist: new Artist(),
      contractor: new Contractor(),
      proposal: new Proposal(),
      timeslot: new Timeslot()
    }
  }
}
