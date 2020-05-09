import Schedule from '@/models/schedule'
import Timeslot from '@/models/timeslot'

export const state = () => ({
  schedule: new Schedule(),
  lastRemovedTimeslotId: null,
  newlyAddedTimeslot: null
})

export const mutations = {
  set_schedule(state, { id, type, timeslots }) {
    state.schedule = new Schedule({ id, type })
    timeslots.forEach((timeslotData) =>
      state.schedule.timeslots.push(new Timeslot(timeslotData))
    )
  },
  append_timeslot(state, timeslotData) {
    state.schedule.timeslots.push(new Timeslot(timeslotData))

    state.newlyAddedTimeslot = this.$array.last(state.schedule.timeslots)
  },
  remove_timeslot(state, { type, id }) {
    this.$array.remove(
      state.schedule.timeslots,
      (timeslot) => timeslot.id === parseInt(id)
    )

    state.lastRemovedTimeslotId = `${type}_${id}`
  }
}

export const actions = {
  async loadSchedule({ commit }, { id, year }) {
    const response = await this.$http.get(`schedules/${id}/${year}`)
    commit('set_schedule', response.data)
  },
  async saveTimeslot({ commit }, { attributes: timeslotData }) {
    const response = await this.$http.post('schedules', timeslotData)

    // commits timeslot in the correct format
    commit('append_timeslot', response.data)
  },
  appendTimeslot({ commit }, timeslotData) {
    commit('append_timeslot', timeslotData)
  },
  removeTimeslot({ commit }, timeslot) {
    commit('remove_timeslot', timeslot)
  }
}

export const getters = {
  lastTimeslot(state) {
    return this.$array.last(state.schedule.timeslots)
  }
}
