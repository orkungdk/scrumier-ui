import Api from '@/service/Api'

export default {
  getTeamReportsDataForSprint(sprintCode) {
    return Api().get('time-tracker/tracker/issues-in-sprint', {
      params: {
        sprintCode
      }
    })
  }
}
