import axios from 'axios'
import Cookie from 'js-cookie'

export default () => {
  const token = Cookie.get('X-Auth-Token')
  return axios.create({
    baseURL: 'http://localhost:8090/api',
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Request-Source': 'User-Interface',
      'X-Auth-Token': 'Bearer ' + token
    }
  })
}
