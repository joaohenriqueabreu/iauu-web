import axios from 'axios'

// const http = axios.create({
//   baseURL: process.env.VUE_APP_API_URL
// })

const http = axios.create({
  baseURL: 'http://localhost:3003/api/'
})

// TODO include token on requests call - nuxt has server/client and sometimes this gets called by serverside
//  need to check how to make it work
if (process.client) {
  // const token = localStorage.getItem('token')
  const token =
    'o1h4o31yh135pj239p52jpi23j24j0j408u240j2j5025y295y40jy08uy024jy0824u82h4t020'
  if (token) {
    http.defaults.headers.authorization = `Bearer ${token}`
    // http.defaults.headers = {
    //   host: 'http://localhost:3000',
    //   accept: '*/*',
    //   authorization: `Bearer ${token}`
    // }
  }
}

export default ({ app }, inject) => {
  inject('http', http)
}