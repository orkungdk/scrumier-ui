import Vuex from 'vuex'
import { ApplicationUser } from '~/model/ApplicationUser'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loggedInUser: ApplicationUser
    },
    mutations: {
      login(loggedInUser) {
        this.loggedInUser = loggedInUser
      }
    }
  })
}

export default createStore
