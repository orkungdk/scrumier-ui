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
      login(state, loggedInUser) {
        state.loggedInUser = loggedInUser
      },
      logout() {
        this.loggedInUser = null
      }
    },
    actions: {
      login(vuexContext, loggedInUser) {
        vuexContext.commit('login', loggedInUser)
      }
    },
    getters: {
      getLoggedInUser(state) {
        return state.loggedInUser
      }
    },
    plugins: [createPersistedState()]
  })
}

export default createStore
