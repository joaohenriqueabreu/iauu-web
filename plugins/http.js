import axios from 'axios'

// const http = axios.create({
//   baseURL: process.env.VUE_APP_API_URL
// })

const http = axios.create({
  baseURL: 'http://localhost:3003/api/'
})

// TODO include token on requests call - nuxt has server/client and sometimes this gets called by serverside
//  need to check how to make it work
// const token = localStorage.getItem('token')
// if (token) {
//   http.defaults.headers.authorization = `Bearer ${token}`
// }

export default ({ app }, inject) => {
  inject('http', http)
}
