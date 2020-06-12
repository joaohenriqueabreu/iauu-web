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
      console.log('Sending request...')
      const { data } = await this.$axios.post('verify', { token: verifyToken })
      commit('set_token', data)
    } catch (error) {
      console.log(error)
    }
  },
  release({ commit }) {
    // No need to hold token as $auth handles it
    commit('release_token')
  }
}
