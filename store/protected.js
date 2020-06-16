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
    const { data } = await this.$axios.post('verify', { token: verifyToken })
    commit('set_token', data)
  },
  release({ commit }) {
    // No need to hold token as $auth handles it
    commit('release_token')
  },
  async resetPassword({ commit }, credentials) {
    await this.$axios.post('reset/password', credentials)
  },
  forgotPassword({ commit }, email) {
    this.$axios.post('reset/forgot', { email })
  },
  async facebookLogin({ commit }, token) {
    const { data } = await this.$axios.post('login/facebook', { token })
    commit('set_token', data)
  }
}
