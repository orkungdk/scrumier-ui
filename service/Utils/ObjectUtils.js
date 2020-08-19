export default {
  anyNoneNull(args) {
    debugger
    return Object.values(args).every((arg) => Boolean(arg))
  }
}
