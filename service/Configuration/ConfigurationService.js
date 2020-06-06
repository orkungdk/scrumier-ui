import Api from '@/service/Api'

export default {
  testConnection(body) {
    return Api().post('/configuration/testJiraConnection', body)
  }
}
