import User from '@/models/user'

export const state = () => ({
  user: new User({
    type: process.browser ? localStorage.getItem('type') : null,
    token: process.browser ? localStorage.getItem('token') : null
  })
})

export const mutations = {}

export const actions = {}

export const getters = {
  isLoggedIn: (state) => state.user.id !== null,
  isArtist: (state) => state.user.type === 'artist',
  isContractor: (state) => state.user.type === 'contractor'
}
