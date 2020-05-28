import firebase from 'gatsby-plugin-firebase'

const getUser = () => {
  if (firebase.auth().currentUser === null) {
    return {}
  }
  return firebase.auth().currentUser
}

const resetPassword = async ({ email }) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email)
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

const updateDisplayName = async ({ password, displayName }) => {
  try {
    const user = await getUser()
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    )
    await user.reauthenticateWithCredential(credentials)
    await user.updateProfile({
      displayName,
    })
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

const updateEmail = async ({ password, email }) => {
  try {
    const user = await getUser()
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    )
    await user.reauthenticateWithCredential(credentials)
    await user.updateEmail(email)
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

export { updatePassword, updateEmail, updateDisplayName, resetPassword }
