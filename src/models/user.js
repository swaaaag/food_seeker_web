import axios from 'common/js/http'

export default class User {
  token = {}
  user = {
    account: '',
    secret: '',
    type: 100,
    nickname: ''
  }

  static register (user) {
    this.user = Object.assign({}, user)
    return axios.post('/user', this.user)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        if (error.error_code === 999) {
          return this.register(this.user)
        } else {
          return Promise.reject(error)
        }
      })
  }

  static login (user) {
    this.user = Object.assign({}, user)
    return axios.post('/token/auth', this.user)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        if (error.error_code === 999) {
          return this.login(this.user)
        } else {
          return Promise.reject(error)
        }
      })
  }

  static getTokenInfo (token) {
    this.token = token
    return axios.post('/token/secret', token)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        if (error.error_code === 999) {
          return this.getTokenInfo(this.token)
        } else {
          return Promise.reject(error)
        }
      })
  }

  static getUser () {
    return axios.get(`/user`)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        if (error.error_code === 999) {
          return this.getUser()
        } else {
          return Promise.reject(error)
        }
      })
  }
}
