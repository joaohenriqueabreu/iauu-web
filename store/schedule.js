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
  }
}

export const actions = {
  async load({ commit }, id) {
    const response = await this.$http.get(`schedules/${id}`)
    commit('set_schedule', response.data)
  }
}

export const getters = {}
