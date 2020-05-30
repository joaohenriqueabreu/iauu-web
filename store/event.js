import Vue from 'vue'
import Proposal from '@/models/proposal'
import Presentation from '@/models/presentation'

export const state = () => ({
  proposal: new Proposal(),
  presentation: new Presentation()
})

export const mutations = {
  reset_proposal(state) {
    state.proposal = new Proposal()
  },
  set_proposal(state, proposalData) {
    state.proposal = new Proposal(proposalData)
  },
  edit_proposal(state, { prop, value }) {
    Vue.set(state.proposal, prop, value)
  },
  set_presentation(state, presentationData) {
    state.presentation = new Presentation(presentationData)
  }
}

export const actions = {
  async loadProposal({ commit }, id) {
    const response = await this.$axios.get(`proposals/${id}`)
    commit('set_proposal', response.data)
  },
  async acceptProposal({ commit }, id) {
    const response = await this.$axios.post(`proposals/${id}`)
    this.dispatch('schedule/appendTimeslot', response.data)
    this.dispatch('schedule/removeTimeslot', { type: 'proposal', id })
  },
  async rejectProposal({ commit }, id) {
    await this.$axios.delete(`proposals/${id}`)
    this.dispatch('schedule/removeTimeslot', { type: 'proposal', id })
    this.dispatch('app/showMessage', {
      message: 'Proposta recusada com sucesso'
    })
  },
  resetProposal({ commit }) {
    commit('reset_proposal')
  },
  editProposal({ commit }, data) {
    commit('edit_proposal', data)
  },
  async loadPresentation({ commit }, id) {
    const response = await this.$axios.get(`presentations/${id}`)
    commit('set_presentation', response.data)
  },
  async confirmPresentation({ commit }, id) {
    await this.$axios.post(`presentations/${id}`)
    this.dispatch('schedule/removeTimeslot', { type: 'presentation', id })
    this.dispatch('app/showMessage', {
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
  isApiLoaded: (state) => state.apiLoaded,
  isMenuOpened: (state) => state.showMenu,
  hasMessage: (state) => state.message !== undefined,
  getMessage: (state) => state.message
}
