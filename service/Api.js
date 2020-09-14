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

/*
for (let i = 0; i < eventCount; i++) {
  const allDay = this.rnd(0, 3) === 0
  const firstTimestamp = this.rnd(min.getTime(), max.getTime())
  const first = new Date(firstTimestamp - (firstTimestamp % 900000))
  const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
  const second = new Date(first.getTime() + secondTimestamp)
*/
