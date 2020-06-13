export const state = () => ({
  token: null
})

export const mutations = {
  set_token(state, token) {
    state.token = token
  },
  release_token(state) {
    state.token = null
  }
}

export const actions = {
  register({ commit }, credentials) {
    this.$axios.post('register', credentials)
  },
  async verify({ commit }, verifyToken) {
    try {
      const { data } = await this.$axios.post('verify', { token: verifyToken })
      console.log('did we get an error?')
      console.log(data)
      commit('set_token', data)
    } catch (error) {
      console.log('We only got error')
      console.log(error)
      throw error
    }
  },
  release({ commit }) {
    // No need to hold token as $auth handles it
    commit('release_token')
  }
}
