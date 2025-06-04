import firebase from '../firebase'
import axios from 'axios'
import { navigate } from 'gatsby'

const isBrowser = typeof window !== `undefined`

const getUser = () => {
  if (firebase.auth().currentUser === null) {
    return {}
  }
  return firebase.auth().currentUser
}

const getIdToken = async () => {
  return getUser().getIdToken()
}

const handleLogin = async ({ email, password }) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    const userId = getUser().id
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('userID', userId)
    }
    return {
      success: true,
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
    }
  }
}

const handleSignup = async ({ username, email, password }) => {
  try {
    const response = await axios.post(
      `${process.env.GATSBY_API_URL}/user/signup`,
      {
        username,
        password,
        email,
      }
    )

    if (response.data.status === 'success') {
      return {
        success: true,
      }
    }
    if (response.error) {
      return {
        success: false,
        message: response.message,
      }
    }
    return {
      success: false,
      message: `Not sure what happened here but it doesn't look good...`,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}

const isLoggedIn = async () => {
  if (!isBrowser) {
    return false
  }

  try {
    // eslint-disable-next-line compat/compat
    await new Promise((resolve, reject) =>
      firebase.auth().onAuthStateChanged(
        user => {
          if (user) {
            // User is signed in.
            resolve(user)
          } else {
            // No user is signed in.
            reject(new Error('no user logged in'))
          }
        },
        error => reject(error)
      )
    )
    return true
  } catch (error) {
    return false
  }
}

const signOut = async () => {
  window.localStorage.removeItem('idToken')
  window.localStorage.removeItem('userID')
  await firebase.auth().signOut()
  await navigate('/login')
}

export { handleLogin, handleSignup, isLoggedIn, signOut, getIdToken }
