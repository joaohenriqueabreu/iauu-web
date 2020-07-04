import Vue from 'vue'
import Artist from '@/models/artist'
import Proposal from '@/models/proposal'

export const state = () => ({
  artists: [],
  artist: null,
  proposal: {}
})

export const mutations = {
  set_artists(state, artistsData) {
    state.artists = []
    artistsData.forEach((artistData) => {
      state.artists.push(new Artist(artistData))
    })
  },
  set_artist(state, artistData) {
    state.artist = new Artist(artistData)
  },
  remove_artist(state, id) {
    Vue.delete(
      state.artists,
      this.$array.findIndex(state.artists, (artist) => artist.id === id)
    )
  },
  init_proposal(state) {
    state.proposal = new Proposal()
  },
  edit_proposal(state, { prop, value }) {
    Vue.set(state.proposal, prop, value)
  }
}

export const actions = {
  async searchArtists({ commit }, filters) {
    const { data } = await this.$axios.get('contractors/artists/search', { params: filters })
    commit('set_artists', data)
  },
  async loadArtist({ commit }, slug) {
    const { data } = await this.$axios.get(`artists/${slug}/public`)
    commit('set_artist', data)
  },
  async loadArtistPrivate({ commit }, id) {
    const { data } = await this.$axios.get(`artists/${id}/private`)
    commit('set_artist', data)
  },
  initProposal({ commit }) {
    commit('init_proposal')
  },
  editProposal({ commit }, data) {
    commit('edit_proposal', data)
  },
  async sendProposal({ state, commit }) {
    await this.$axios.post('proposals', state.proposal)
  }
}

export const getters = {}
