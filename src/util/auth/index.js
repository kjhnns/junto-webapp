/* eslint-disable no-console */
/* eslint-disable compat/compat */
/* eslint-disable prefer-promise-reject-errors */
import firebase from 'gatsby-plugin-firebase'
import { navigate } from 'gatsby'

const isBrowser = typeof window !== `undefined`

const isLoggedIn = async () => {
  if (!isBrowser) {
    // return firebase.auth().currentUser !== null
    return false
  }

  try {
    await new Promise((resolve, reject) =>
      firebase.auth().onAuthStateChanged(
        user => {
          if (user) {
            // User is signed in.
            resolve(user)
          } else {
            // No user is signed in.
            reject('no user logged in')
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
