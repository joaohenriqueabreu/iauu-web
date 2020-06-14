export default function({ app, redirect }) {
  console.log('Are we logged in?')
  if (!app.$auth.loggedIn) {
    return redirect('/login')
  }

  console.log('Yes we are')
}
