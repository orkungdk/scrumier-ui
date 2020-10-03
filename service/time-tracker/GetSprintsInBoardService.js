import Api from '@/service/Api'

export default {
  getSprintsInABoard(boardId) {
    return Api().get('/time-tracker/tracker/sprints', { params: { boardId } })
  }
}
