import Vuex from 'vuex'
import Cookie from 'js-cookie'
import ObjectUtils from '~/service/Utils/ObjectUtils'
import settings from '~/store/modules/settings'

const createStore = () => {
  return new Vuex.Store({
    actions: {
      nuxtServerInit(vuexContext, context) {
        const cookie = context.req.headers.cookie
        // if cookie is not exist, do noting
        if (cookie) {
          const parsedCookies = cookie.split(';')
          const user = ObjectUtils.parseUserFromCookie(parsedCookies)
          // if user is not exist in cookie, do noting
          if (user) {
            Cookie.set('X-Auth-User', JSON.stringify(user))
            vuexContext.commit('login', JSON.parse(user))
          }
        }
      }
    },
    modules: {
      settings
    }
  })
}

export default createStore
