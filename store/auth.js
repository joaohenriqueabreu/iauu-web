import User from '@/models/user'

export const state = () => ({
  user: new User({
    type: process.browser ? localStorage.getItem('type') : null,
    token: process.browser ? localStorage.getItem('token') : null
  })
})

export const mutations = {
  set_user(state, userData) {
    state.user = new User(userData)
  }
}

export const actions = {
  async login({ commit }, credentials) {
    const response = await this.$http.post('login', credentials)
    if (process.client) {
      localStorage.setItem('token', response.data.token)
    }

    commit('set_user', response.data)
  }
}

export const getters = {
  isLoggedIn: (state) => state.user.id !== null,
  // isArtist: (state) => state.user.type === 'artist',
  isArtist: (state) => true, // TODO hard-coded for now - change to the above when auth layer is set
  isContractor: (state) => state.user.type === 'contractor'
}
