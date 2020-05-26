import Vue from 'vue'
// import Schedule from '@/models/schedule'
import Timeslot from '@/models/timeslot'

export const state = () => ({
  // schedule: new Schedule(),
  timeslots: [],
  lastRemovedTimeslotId: null,
  newlyAddedTimeslot: null
})

export const mutations = {
  set_schedule(state, { id, type, timeslots }) {
    // state.schedule = new Schedule({ id, type })
    state.timeslots = []
    timeslots.forEach((timeslotData) => state.timeslots.push(new Timeslot(timeslotData)))
  },
  append_timeslot(state, timeslotData) {
    Vue.set(state.timeslots, state.timeslots.length, new Timeslot(timeslotData))
  },
  remove_timeslot(state, { type, id }) {
    Vue.delete(
      state.timeslots,
      this.$array.findIndex(state.timeslots, (timeslot) => timeslot.id === parseInt(id))
    )
  }
}

export const actions = {
  async loadSchedule({ commit }, { id, year }) {
    const { data } = await this.$axios.get(`schedules/${id}/${year}`)
    commit('set_schedule', data)
  },
  async saveTimeslot({ commit }, { attributes: timeslotData }) {
    const { data } = await this.$axios.post('schedules', timeslotData)

    // commits timeslot in the correct format
    commit('append_timeslot', data)
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
    return this.$array.last(state.timeslots)
  },
  presentations(state) {
    return state.timeslots.filter((timeslot) => timeslot.type === 'presentation')
  },
  proposals(state) {
    return state.timeslots.filter((timeslot) => timeslot.type === 'proposal')
  }
}
