export default function({ app, redirect }) {
  console.log('Do we have artist scope?')
  console.log(app.$auth.hasScope('artist'))
  if (!app.$auth.hasScope('artist')) {
    return redirect('/')
  }
}
