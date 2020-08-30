export default function(context) {
  if (process.client) {
    console.log('client session-control')
    context.store.dispatch('initAuth')
  } else {
    console.log('server session-control')
    context.store.dispatch('initAuth', context.req)
  }
}
