import Api from '@/service/Api'

export default {
  getAllBoards() {
    return Api().get('time-tracker/tracker/boards')
  }
}
