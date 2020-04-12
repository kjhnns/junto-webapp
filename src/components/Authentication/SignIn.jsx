import React from 'react'
import firebase from 'gatsby-plugin-firebase'
import axios from 'axios'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { SecondaryButton } from '@components/Button'
import { Text } from '@components/Text'
import { Flex, Box } from '@components/Grid'
import { TextInput } from '@components/Form'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Not a valid email address')
    .required('Mandatory Field'),
  password: Yup.string()
    .required('Mandatory Field')
    .min(6, 'At least 6 characters long'),
})

const send = async idToken => {
  const response = await axios.post(`${process.env.SERVER_URL}/user/signin`, {
    id_token: idToken,
  })
  return response
}

const SubmitHandler = async ({ email, password }) => {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
  const idToken = await response.user.getIdToken()
  const sessionCookie = await send(idToken)
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem('sessionCookie', sessionCookie.data.cookie)
    window.localStorage.setItem('userID', sessionCookie.data.id)
  }
}

const SignIn = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={SubmitHandler}
      render={() => (
        <Form>
          <Flex
            m={[3, 5, 5]}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text as="h1">Sign In</Text>
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
              <Box width={['90%', '350px', '350px']} mx={4} mt={4}>
                <SecondaryButton width="100%" type="submit">
                  Sign In
                </SecondaryButton>
              </Box>
            </Flex>
          </Flex>
        </Form>
      )}
    />
  )
}

export default SignIn
