import firebase from 'gatsby-plugin-firebase'
import axios from 'axios'
import { navigate } from 'gatsby'

axios.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    if (error.response.status === 401) {
      window.localStorage.removeItem('sessionCookie')
      window.localStorage.removeItem('userID')
      await firebase.auth().signOut()
      await navigate('/')
    }
    return error
  }
)

export { axios }
