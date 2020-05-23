import Cookie from 'js-cookie'
// import User from '@/models/user'

class Auth {
  constructor(store) {
    this.store = store
    this.loggedIn = false
    this.user = null
  }

  getToken() {
    // console.log('trying to get token')
    // try to get from state
    if (this.store.state.auth.token !== null) {
      return this.store.state.auth.token
    }

    // try to fetch from localStorage
    if (process.client) {
      return localStorage.getItem('token')
    }

    // otherwise try to get from cookie
    return Cookie.get('token')
  }

  async login(provider, credentials) {
    // console.log('trying to login')
    await this.store.dispatch('auth/login', credentials)

    // Confirm token was stored successfully in state
    const { token } = this.store.state.auth

    // console.log('We have a token')
    // console.log(token)

    if (token === null || token === undefined) {
      throw new Error('Response did not get a valid token')
    }

    Cookie.set('token', token)
    // console.log('We have a cookie')
    // console.log(Cookie.get('token'))

    // Persist in local storage
    if (process.client) {
      localStorage.setItem('token')
    }
  }

  async validate() {
    // console.log('trying to get validate')
    // first set loggedIn flag
    this.loggedIn = false

    const token = this.getToken()
    if (token === null || token === undefined) {
      throw new Error('No token to validate, please login')
    }

    try {
      await this.store.dispatch('auth/validate', token)
    } catch {
      // Forwar error to middleware
      throw new TypeError('Invalid token')
    }

    // Confirm user is set
    const { user } = this.store.state.auth.user

    if (!typeof user === 'User' || user.id === 0) {
      throw new TypeError('Invalid token')
    }

    this.user = user

    // User is valid!
    this.loggedIn = true
  }
}

export default ({ app, store, route }, inject) => {
  inject('auth', new Auth(store))
}
