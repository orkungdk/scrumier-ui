export default function(context) {
  console.log('auth.js')
  if (!context.store.getters.isAuthenticated) {
    console.log('auth.js loggedIn')
    context.redirect('/account/login')
  }
}
