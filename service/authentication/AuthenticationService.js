import Api from '@/service/Api'

export default {
  authenticate(body) {
    return Api().post('/authentication/authenticate', body)
  }
}
