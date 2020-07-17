import Proposal from '@/models/proposal'
import Presentation from '@/models/presentation'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  proposal: new Proposal(),
  presentation: new Presentation()
})

export const mutations = {
  updateField,
  set_proposal(state, proposalData) {
    state.proposal = new Proposal(proposalData)
  },
  set_presentation(state, presentationData) {
    state.presentation = new Presentation(presentationData)
  }
}

export const actions = {
  async loadProposal({ commit }, id) {
    const { data } = await this.$axios.get(`presentations/proposal/${id}`)
    console.log(data)
    commit('set_proposal', data)
  },
  async selectTimeslot({ commit }, { id, timeslot }) {
    await this.$axios.put(`presentations/${id}/timeslot`, { timeslot })
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
    await this.$axios.post(`presentations/${id}`)
    this.dispatch('schedule/removeTimeslot', { type: 'presentation', id })
    this.dispatch('app/setAlert', {
      message:
        'Obrigado por confirmar a realização da apresentação! Vamos agora finalizar os pagamentos pendentes'
    })
  },
  async cancelPresentation({ commit }, id) {
    await this.$axios.delete(`presentations/${id}`)
    this.dispatch('schedule/removeTimeslot', { type: 'presentation', id })
  }
}

export const getters = {
  getField,
  isApiLoaded: (state) => state.apiLoaded,
  isMenuOpened: (state) => state.showMenu,
  hasMessage: (state) => state.message !== undefined,
  getMessage: (state) => state.message
}
