/* eslint-disable no-console */
import firebase from 'gatsby-plugin-firebase'
import { navigate } from 'gatsby'

const isBrowser = typeof window !== `undefined`

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
        // Prevent console error
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

export { isLoggedIn, signOut, getUser }
