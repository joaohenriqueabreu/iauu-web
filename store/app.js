export const state = () => ({
  showMenu: false,
  searchFilters: {
    term: ''
  },
  alert: {
    type: null,
    message: null
  }
})

export const mutations = {
  toggle_menu(state) {
    state.showMenu = !state.showMenu
  },
  close_menu(state) {
    state.showMenu = false
  },
  show_message(state, { type, message }) {
    state.alert.type = type
    state.alert.message = message
  },
  clear_message(state) {
    state.alert.message = null
    state.alert.type = null
  },
  set_search_filters(state, filters) {
    state.searchFilters = filters
  }
}

export const actions = {
  toggleMenu({ commit }) {
    commit('toggle_menu')
  },
  closeMenu({ commit }) {
    commit('close_menu')
  },
  showMessage({ commit }, { message, type = 'success' }) {
    commit('show_message', { type, message })
    setTimeout(() => {
      commit('clear_message')
    }, this.$config.alertTimer)
  },
  setSearchFilters({ commit }, searchFilters) {
    commit('set_search_filters', searchFilters)
  }
}

export const getters = {
  isMenuOpened: (state) => state.showMenu,
  hasMessage: (state) => state.alert.message !== null || state.alert.message !== undefined
}
