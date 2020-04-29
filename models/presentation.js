import BaseModel from './base'
import Artist from './artist'
import Contractor from './contractor'
import Proposal from './proposal'
import Timeslot from './timeslot'

export default class Presentation extends BaseModel {
  defaults() {
    return {
      status: null,
      artist: new Artist(),
      contractor: new Contractor(),
      proposal: new Proposal(),
      timeslot: new Timeslot()
    }
  }
}
