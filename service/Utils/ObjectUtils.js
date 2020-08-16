export default {
  anyNoneNull(args) {
    return Object.values(args).some((arg) => Boolean(arg))
  }
}
