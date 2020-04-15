import React, { useState } from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import { navigate } from 'gatsby'
import firebase from 'gatsby-plugin-firebase'
import * as Yup from 'yup'

import { Text } from '@components/Text'
import { SecondaryButton } from '@components/Button'
import { Flex, Box } from '@components/Grid'
import { TextInput } from '@components/Form'
import ErrorMessage from '@components/Form/ErrorMessage'

const initialValues = {
  email: '',
  password: '',
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Not a valid email address')
    .required('Mandatory Field'),
  password: Yup.string().required('Mandatory Field'),
})

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Text as="h1">Sign In</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          try {
            console.info('START')
            const response = await firebase
              .auth()
              .signInWithEmailAndPassword(values.email, values.password)
            console.info(response)
            const idToken = await response.user.getIdToken()
            const sessionCookie = await axios.post(
              `${process.env.GATSBY_API_URL}/user/signin`,
              {
                id_token: idToken,
              }
            )
            if (typeof window !== 'undefined' && window.localStorage) {
              window.localStorage.setItem(
                'sessionCookie',
                sessionCookie.data.cookie
              )
              window.localStorage.setItem('userID', sessionCookie.data.id)
            }
            navigate('/app/dashboard')
          } catch (error) {
            setErrorMessage(error.message)
          }
          setSubmitting(false)
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
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
              {errorMessage && (
                <Box width={['90%', '350px', '350px']} mx={4} mt={4}>
                  <ErrorMessage>{errorMessage}</ErrorMessage>
                </Box>
              )}
              <Box width={['90%', '350px', '350px']} mx={4} mt={4}>
                <SecondaryButton width="100%" type="submit">
                  {isSubmitting ? `Signing In...` : `Sign In`}
                </SecondaryButton>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  )
}

export default SignIn
