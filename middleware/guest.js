export default function({ app, redirect }) {
  // Only when not logged in
  if (app.$auth.loggedIn) {
    app.$toast.warning('Você já está logado')
    return redirect('/')
  }
}
