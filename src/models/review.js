import axios from 'axios'

export default class Review {
  id = 0
  uid = 0
  review = {}

  static getReview (id) {
    this.id = id
    return axios.get(`/review/${id}`)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        if (error.error_code === 999) {
          return this.getReview(this.id)
        } else {
          return Promise.reject(error)
        }
      })
  }

  static getReviews (id, count = 30) {
    this.id = id
    return axios.get(`/restaurant/${id}/reviews?per_page=${count}`)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        if (error.error_code === 999) {
          return this.getReviews(this.id)
        } else {
          return Promise.reject(error)
        }
      })
  }

  static getReviewsByUid (uid) {
    this.uid = uid
    return axios.get(`/user/${uid}/reviews?per_page=30`)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        if (error.error_code === 999) {
          return this.getReviewsByUid(this.uid)
        } else {
          return Promise.reject(error)
        }
      })
  }

  static addReview (review) {
    this.review = review
    return axios.post('/review', review)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        if (error.error_code === 999) {
          return this.addReview(this.review)
        } else {
          return Promise.reject(error)
        }
      })
  }
}
