import User from '@/models/user'

export const state = () => ({
  token: null,
  user: new User()
})

export const mutations = {
  set_token(state, token) {
    state.token = token
  },
  set_user(state, userData) {
    state.user = new User(userData)
  }
}

export const actions = {
  async login({ commit }, credentials) {
    const { data } = await this.$axios.post('login', credentials)
    commit('set_token', data.token)
  },
  async validate({ commit }, token) {
    const { data } = await this.$axios.post('validate', token)
    commit('set_user', data.user)
  }
}

export const getters = {}
