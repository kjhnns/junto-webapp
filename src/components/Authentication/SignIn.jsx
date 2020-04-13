import React, { useState } from 'react'
import PropTypes from 'prop-types'
import firebase from 'gatsby-plugin-firebase'
import axios from 'axios'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { SecondaryButton } from '@components/Button'
import { Text } from '@components/Text'
import { Flex, Box } from '@components/Grid'
import { TextInput } from '@components/Form'
import ErrorMessage from '@components/Form/ErrorMessage'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Not a valid email address')
    .required('Mandatory Field'),
  password: Yup.string()
    .required('Mandatory Field')
    .min(6, 'At least 6 characters long'),
})

const SignInForm = ({ submitHandler, errorMessage }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async values => {
        await submitHandler(values)
      }}
      render={() => (
        <Form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box width={['90%', '350px', '350px']} mx={4} mt={[4, 0, 0]}>
              <TextInput name="email" label="Email" />
            </Box>
            <Box width={['90%', '350px', '350px']} mx={4} mt={[4, 0, 0]}>
              <TextInput type="password" name="password" label="Password" />
            </Box>
            {errorMessage !== '' ? (
              <Box width={['90%', '350px', '350px']} mx={4} mt={4}>
                <ErrorMessage>{errorMessage}</ErrorMessage>
              </Box>
            ) : (
              ''
            )}
            <Box width={['90%', '350px', '350px']} mx={4} mt={4}>
              <SecondaryButton width="100%" type="submit">
                Sign In
              </SecondaryButton>
            </Box>
          </Flex>
        </Form>
      )}
    />
  )
}

SignInForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
}

SignInForm.defaultProps = {
  errorMessage: null,
}

const Success = () => <Text>Success</Text>
const Loading = () => <Text>Loading ...</Text>

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
    } catch (error) {
      setErrorMessage(error.message)
      setState(-1)
    }
  }

  return (
    <Flex
      m={[3, 5, 5]}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {state <= 0 ? (
        <SignInForm submitHandler={submitHandler} errorMessage={errorMessage} />
      ) : (
        ''
      )}
      {state === 2 ? <Loading /> : ''}
      {state === 1 ? <Success /> : ''}
    </Flex>
  )
}

export default SignIn
