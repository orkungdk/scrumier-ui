import Api from '@/service/Api'

export default {
  addWorklog(body) {
    return Api().post('/time-tracker/tracker/worklogs', body)
  }
}
