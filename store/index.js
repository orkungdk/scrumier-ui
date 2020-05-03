import Vuex from 'vuex'
import { User } from '~/model/User'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loggedInUser: User
    },
    mutations: {
      login(loggedInUser) {
        this.loggedInUser = loggedInUser
      }
    }
  })
}

export default createStore
