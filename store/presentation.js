import Proposal from '@/models/proposal'
import Presentation from '@/models/presentation'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  proposal: {},
  presentation: {},
  presentations: []
})

export const mutations = {
  updateField,
  set_proposal(state, proposalData) {
    state.proposal = new Proposal(proposalData)
  },
  set_presentation(state, presentationData) {
    state.presentation = new Presentation(presentationData)
  },
  set_presentations(state, presentationsData) {
    state.presentations = presentationsData
  }
}

export const actions = {
  async loadProposal({ commit }, id) {
    const { data } = await this.$axios.get(`presentations/proposal/${id}`)
    commit('set_proposal', data)
  },
  async loadPresentations({ commit }) {
    const { data } = await this.$axios.get('presentations')
    commit('set_presentations', data)
  },
  async selectTimeslot({ commit }, { id, timeslot }) {
    const { data } = await this.$axios.put(`presentations/${id}/timeslot`, { timeslot })
    commit('set_presentation', data)
  },
  async sendCounterOffer({ state, commit }, counterOffer) {
    await this.$axios.post(`presentations/${state.presentation.id}/proposal/counterOffer`, { counterOffer })
    this.dispatch('schedule/loadMySchedule')
  },
  async acceptCounterOffer({ state, commit }) {
    await this.$axios.put(`presentations/${state.presentation.id}/proposal/counterOffer`)
  },
  async rejectCounterOffer({ state, commit }) {
    await this.$axios.delete(`presentations/${state.presentation.id}/proposal/counterOffer`)
  },
  async acceptProposal({ commit }, id) {
    const { data } = await this.$axios.post(`presentations/${id}/proposal/`)
    this.dispatch('schedule/loadMySchedule')
  },
  async rejectProposal({ commit }, id) {
    const { data } = await this.$axios.delete(`presentations/${id}/proposal/`)
    this.dispatch('schedule/loadMySchedule')
  },
  async loadPresentation({ commit }, id) {
    const { data } = await this.$axios.get(`presentations/${id}`)
    commit('set_presentation', data)
  },
  async confirmPresentation({ commit }, id) {
    const { data } = await this.$axios.put(`presentations/${id}`)
    commit('set_presentation', data)
    this.dispatch('schedule/loadMySchedule')
  },
  async cancelPresentation({ commit }, id) {
    const { data } = await this.$axios.delete(`presentations/${id}`)
    commit('set_presentation', data)
    this.dispatch('schedule/loadMySchedule')
  }
}

export const getters = {
  getField,
  isApiLoaded: (state) => state.apiLoaded,
  isMenuOpened: (state) => state.showMenu,
  hasMessage: (state) => state.message !== undefined,
  getMessage: (state) => state.message
}
