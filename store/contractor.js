import Vue from 'vue'
import Artist from '@/models/product'

export const state = () => ({
  artists: [],
  selectedArtistId: 0
})

export const mutations = {
  set_artists(state, artistsData) {
    state.artists = []
    artistsData.forEach((artistData) => {
      state.artists.push(new Artist(artistData))
    })
  },
  select_artist(state, id) {
    state.selectedArtistId = id
  },
  set_artist(state, artistData) {
    state.artists.unshift(new Artist(artistData))
  },
  remove_artist(state, id) {
    Vue.delete(
      state.artists,
      this.$array.findIndex(state.artists, (artist) => artist.id === id)
    )
  }
}

export const actions = {
  async searchArtists({ commit }, filters) {
    const { data } = await this.$axios.get('artists', { params: JSON.stringify(filters) })
    commit('set_artists', data)
  },
  selectArtist({ commit }, id) {
    commit('select_artist', id)
  },
  async loadArtist({ commit }) {}
}

export const getters = {}
