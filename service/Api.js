import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:8090/api',
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Request-Source': 'User-Interface',
      'X-Auth-Token': localStorage ? localStorage.getItem('X-Auth-Token') : ''
    }
  })
}
