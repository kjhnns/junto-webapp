import React, { useState } from 'react'
import firebase from 'gatsby-plugin-firebase'
import axios from 'axios'
import { navigate } from 'gatsby'
import { Text } from '@components/Text'
import { Flex } from '@components/Grid'

import Success from './Success'
import Form from './Form'
import Loading from './Loading'

const SignIn = () => {
  const [state, setState] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  const submitHandler = async ({ email, password }) => {
    setState(2)
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
      setState(1)
      navigate('/app/dashboard')
    } catch (error) {
      setErrorMessage(error.message)
      setState(-1)
    }
  }

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Text as="h1">Sign In</Text>
      {state <= 0 ? (
        <Form submitHandler={submitHandler} errorMessage={errorMessage} />
      ) : (
        ''
      )}
      {state === 2 ? <Loading /> : ''}
      {state === 1 ? <Success /> : ''}
    </Flex>
  )
}

export default SignIn