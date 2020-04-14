/* eslint-disable compat/compat */
/* eslint-disable prefer-promise-reject-errors */
import firebase from 'gatsby-plugin-firebase'

const isLoggedIn = async () => {
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

export { isLoggedIn }
