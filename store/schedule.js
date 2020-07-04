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
  set_schedule(state, schedule) {
    state.timeslots = schedule
  },
  append_timeslot(state, timeslotData) {
    Vue.set(state.timeslots, state.timeslots.length, new Timeslot(timeslotData))
  },
  remove_timeslot(state, id) {
    Vue.delete(
      state.timeslots,
      this.$array.findIndex(state.timeslots, (timeslot) => timeslot.id === id)
    )
  }
}

export const actions = {
  async loadSchedule({ commit }, { id, year }) {
    const { data } = await this.$axios.get(`schedules/${id}/${year}`)
    commit('set_schedule', data)
  },
  async saveTimeslot({ commit }, timeslot) {
    const { data } = await this.$axios.post('schedules', { timeslot })
    // commit('set_schedule', data)

    // commits timeslot in the correct format
    commit('append_timeslot', data)
  },
  appendTimeslot({ commit }, timeslotData) {
    commit('append_timeslot', timeslotData)
  },
  deselectTimeslot({ commit }, id) {
    commit('remove_timeslot', id)
  },
  async removeTimeslot({ commit }, id) {
    await this.$axios.delete(`schedules/${id}`)
    commit('remove_timeslot', id)
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
