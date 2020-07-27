import Proposal from '@/models/proposal'
import Presentation from '@/models/presentation'
import _ from 'lodash'
import moment from 'moment'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  stats: [],
  users: [],
  presentations: []
})

export const mutations = {
  updateField,
  set_stats(state, data) {
    state.stats = data
  },
  set_users(state, data) {
    state.users = data
  },
  set_presentations(state, data) {
    state.presentations = data
  }
}

export const actions = {
  async status() {
    await this.$axios.get('/')
  },
  async loadStats({ commit }, id) {
    const { data } = await this.$axios.get('admin/stats')
    commit('set_stats', data)
  },
  async loadUsers({ commit }) {
    const { data } = await this.$axios.get('admin/users')
    commit('set_users', data)
  },
  async loadPresentations({ commit }) {
    const { data } = await this.$axios.get('admin/presentations')
    commit('set_presentations', data)
  },
}

export const getters = {
  getField
}
