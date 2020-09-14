import Api from '@/service/Api'

export default {
  retrieveWorklogs(start, end) {
    // TODO: parse header from authentication
    return Api().get('/time-tracker/tracker/worklogs', {
      headers: { 'X-auth-user': 'admin' },
      params: { startDate: start, endDate: end }
    })
  }
}
