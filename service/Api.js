import axios from 'axios'
import Cookie from 'js-cookie'

export default () => {
  const cookieToken = Cookie.get('X-Auth-Token')
  const authToken = cookieToken ? 'Bearer ' + cookieToken : ''

  return axios.create({
    baseURL: process.env.baseURL,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Request-Source': 'Scrumier-UI',
      'X-Auth-Token': authToken
    }
  })
}
