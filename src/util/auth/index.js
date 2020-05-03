import firebase from 'gatsby-plugin-firebase'
import axios from 'axios'
import { navigate } from 'gatsby'

const isBrowser = typeof window !== `undefined`

const handleLogin = async ({ email, password }) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    const idToken = await response.user.getIdToken()
    const sessionCookie = await axios.post(
      `${process.env.GATSBY_API_URL}/user/signin`,
      {
        id_token: idToken,
      }
    )
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('sessionCookie', sessionCookie.data.cookie)
      window.localStorage.setItem('userID', sessionCookie.data.id)
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
        error: true,
        message: response.message,
      }
    }
    return {
      error: true,
      message: `Not sure what happened here but it doesn't look good...`,
    }
  } catch (error) {
    return {
      error: true,
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

const getUser = () => {
  if (firebase.auth().currentUser === null) {
    return {}
  }
  return firebase.auth().currentUser
}

const signOut = async () => {
  await firebase.auth().signOut()
  await navigate('/')
}

const updatePassword = async ({ currentPassword, password }) => {
  try {
    const user = await getUser()
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    )
    await user.reauthenticateWithCredential(credentials)
    await user.updatePassword(password)
    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      description: error,
    }
  }
}

export {
  handleLogin,
  handleSignup,
  isLoggedIn,
  signOut,
  getUser,
  updatePassword,
}
