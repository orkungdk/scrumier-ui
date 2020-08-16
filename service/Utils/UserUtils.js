export default {
  isAdmin(user) {
    return user.permissions.includes('ADMIN')
  },
  parsePermissions(response) {
    const permissions = []
    response.data.authorities.forEach((value, index) => {
      permissions.push(value.permission)
    })
    return permissions
  }
}
