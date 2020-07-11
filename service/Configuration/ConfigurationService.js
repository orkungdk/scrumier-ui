import Api from '@/service/Api'

export default {
  setup(body) {
    return Api().post('/configuration/setup', body)
  },
  getJiraConfig() {
    return Api().get('/configuration/jira')
  }
}
