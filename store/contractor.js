import Vue from 'vue'
import Artist from '@/models/product'

export const state = () => ({
  artists: [],
  artist: null
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
    state.artist = new Artist(artistData)
    // state.artists.unshift(new Artist(artistData))
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
  async loadArtist({ commit }, slug) {
    const { data } = await this.$axios.get(`artists/${slug}`)
    commit('set_artist', data)
  }
}

export const getters = {}
