import Schedule from '@/models/schedule'
import Timeslot from '@/models/timeslot'

export const state = () => ({
  schedule: new Schedule()
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
  }
}

export const actions = {
  async load({ commit }, id) {
    const response = await this.$http.get(`schedules/${id}`)
    commit('set_schedule', response.data)
  },
  async saveTimeslot({ commit }, { attributes: timeslotData }) {
    const response = await this.$http.post('schedules', timeslotData)

    // commits timeslot in the correct format
    commit('append_timeslot', response.data)
  },
  appendTimeslot({ commit }, timeslotData) {
    commit('append_timeslot', timeslotData)
  }
}

export const getters = {}
