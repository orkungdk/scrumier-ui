import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
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
      },
      logout() {
        this.loggedInUser = null
      }
    },
    plugins: [createPersistedState()]
  })
}

export default createStore
