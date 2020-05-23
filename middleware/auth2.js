export default function({ app, redirect }) {
  // console.log('We are at the middleware')
  // console.log(app.$auth.loggedIn)

  if (!app.$auth.loggedIn) {
    try {
      app.$auth.validate()
    } catch {
      return redirect('/login')
    }
  }
}
