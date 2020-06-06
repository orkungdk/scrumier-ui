import Vuex from 'vuex'
import { ApplicationUser } from '~/model/ApplicationUser'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loggedInUser: ApplicationUser,
      setUp: {
        type: Boolean,
        default: true
      }
    },
    mutations: {
      login(loggedInUser) {
        this.loggedInUser = loggedInUser
      }
    }
  })
}

export default createStore
