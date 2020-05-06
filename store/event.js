import Proposal from '@/models/proposal'
import Presentation from '@/models/presentation'

export const state = () => ({
  proposal: new Proposal(),
  presentation: new Presentation()
})

export const mutations = {
  set_proposal(state, proposalData) {
    state.proposal = new Proposal(proposalData)
  },
  set_presentation(state, presentationData) {
    state.presentation = new Presentation(presentationData)
  }
}

export const actions = {
  async loadProposal({ commit }, id) {
    const response = await this.$http.get(`proposals/${id}`)
    commit('set_proposal', response.data)
  },
  async acceptProposal({ commit }, id) {
    const response = await this.$http.post(`proposals/${id}`)
    this.dispatch('schedule', response.data)
  },
  async rejectProposal({ commit }, id) {
    const response = await this.$http.delete(`proposals/${id}`)
    this.dispatch('schedule', response.data)
  }
}

export const getters = {
  isApiLoaded: (state) => state.apiLoaded,
  isMenuOpened: (state) => state.showMenu,
  hasMessage: (state) => state.message !== undefined,
  getMessage: (state) => state.message
}
