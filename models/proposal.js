import Model from './model'
import Artist from './artist'
import Contractor from './contractor'
import Timeslot from './timeslot'

export default class Presentation extends Model {
  constructor(proposal) {
    super()
    this.id = null
    this.status = null
    this.artist = new Artist()
    this.contractor = new Contractor()
    this.timeslot = new Timeslot()

    this.assign(proposal)
  }
}
