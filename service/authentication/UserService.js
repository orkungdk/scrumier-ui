import Api from '@/service/Api'

export default {
  getByUsername(identifier) {
    return Api().get('/authentication/user' + identifier)
  },
  getAll() {
    return Api().get('/authentication/user')
  },
  register(body) {
    return Api().post('/authentication/user', body)
  },
  update(body) {
    return Api().put('/authentication/user', body)
  }
}
