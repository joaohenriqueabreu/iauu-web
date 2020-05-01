import User from '@/models/user'

export const state = () => ({
  user: new User({
    id: 123, // TODO temp for now
    type: process.browser ? localStorage.getItem('type') : null,
    token: process.browser ? localStorage.getItem('token') : null
  })
})

export const mutations = {}

export const actions = {}

export const getters = {
  isLoggedIn: (state) => state.user.id !== null,
  // isArtist: (state) => state.user.type === 'artist',
  isArtist: (state) => true, // TODO hard-coded for now - change to the above when auth layer is set
  isContractor: (state) => state.user.type === 'contractor'
}
