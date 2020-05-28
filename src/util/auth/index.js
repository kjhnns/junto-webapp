import firebase from 'gatsby-plugin-firebase'

import { axios } from './http'

import {
  updatePassword,
  updateEmail,
  updateDisplayName,
  resetPassword,
} from './modify'

import {
  handleLogin,
  handleSignup,
  isLoggedIn,
  signOut,
  getIdToken,
} from './session'

const getUser = () => {
  if (firebase.auth().currentUser === null) {
    return {}
  }
  return firebase.auth().currentUser
}

export {
  axios,
  handleLogin,
  handleSignup,
  isLoggedIn,
  signOut,
  getUser,
  updatePassword,
  updateEmail,
  updateDisplayName,
  resetPassword,
  getIdToken,
}
