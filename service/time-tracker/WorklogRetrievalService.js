import Api from '@/service/Api'

export default {
  retrieveUserOnlyWorklogs(start, end) {
    // TODO: parse header from account
    return Api().get('/time-tracker/tracker/worklogs', {
      headers: { 'X-auth-user': 'admin' },
      params: { startDate: start, endDate: end, isUserOnly: 'true' }
    })
  },
  retrieveAllWorklogs(start, end) {
    return Api().get('/time-tracker/tracker/worklogs', {
      headers: { 'X-auth-user': 'admin' },
      params: { startDate: start, endDate: end, isUserOnly: 'false' }
    })
  }
}
