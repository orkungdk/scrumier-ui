export default {
  anyNoneNull(args) {
    return Object.values(args).every((arg) => Boolean(arg))
  },
  parseErrorMessage(errorResponse) {
    if (Array.isArray(errorResponse)) {
      let errorMessage = ''

      for (const index in errorResponse) {
        // in case of there are multiple errors, each error message separates with a new line
        if (errorMessage) {
          errorMessage = errorMessage.concat('\n')
        }
        errorMessage = errorMessage.concat(
          this.invokeSingleError(errorResponse[index])
        )
      }
      return errorMessage
    } else {
      return this.invokeSingleError(errorResponse)
    }
  },
  invokeSingleError(error) {
    return error.title + ' ' + error.detail
  },
  parseCookie(cookies, name) {
    const cookie = cookies.find((cookie) =>
      cookie.trim().startsWith(name + '=')
    )
    if (cookie) {
      return cookie.substring(cookie.indexOf('=') + 1)
    }
  },
  parseUserFromCookie(cookies) {
    let storedUser = this.parseCookie(cookies, 'X-Auth-User')
    if (storedUser) {
      storedUser = storedUser.replace(/%22/g, '"') // replaces for "
      storedUser = storedUser.replace(/%2C/g, ',') // replaces for ,

      return JSON.parse(JSON.stringify(storedUser))
    }
  }
}
