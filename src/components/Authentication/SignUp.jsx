import React from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import firebase from 'gatsby-plugin-firebase'
import * as Yup from 'yup'
import { navigate } from 'gatsby'
import { SecondaryButton } from '@components/Button'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Text'
import { TextInput } from '@components/Form'

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Mandatory Field'),
  email: Yup.string()
    .email('Please provide a valid email address')
    .required('Mandatory Field'),
  password: Yup.string()
    .required('Mandatory Field')
    .min(6, 'Must be at least 6 characters long'),
  confirmPassword: Yup.string()
    .required('Mandatory Field')
    // eslint-disable-next-line func-names
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value
    }),
})

const SubmitHandler = async ({ username, password, email }) => {
  try {
    await axios.post(`${process.env.GATSBY_API_URL}/user/signup`, {
      username,
      password,
      email,
    })

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
    navigate('/app/signin')
  } catch (error) {
    console.log(error)
  }
}

const SignUp = () => {
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={SubmitHandler}
      render={() => (
        <Form>
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text as="h1">Sign Up</Text>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box width={['90%', '350px', '350px']} mx={4}>
                <TextInput name="username" label="Username" />
              </Box>
              <Box width={['90%', '350px', '350px']} mx={4} mt={[4, 0, 0]}>
                <TextInput name="email" label="Email" />
              </Box>
              <Box width={['90%', '350px', '350px']} mx={4} mt={[4, 0, 0]}>
                <TextInput type="password" name="password" label="Password" />
              </Box>
              <Box width={['90%', '350px', '350px']} mx={4} mt={[4, 0, 0]}>
                <TextInput
                  type="password"
                  name="confirmPassword"
                  label="Password confirmation"
                />
              </Box>
              <Box width={['90%', '350px', '350px']} mx={4} mt={4}>
                <SecondaryButton width="100%" type="submit">
                  Get Started
                </SecondaryButton>
              </Box>
            </Flex>
          </Flex>
        </Form>
      )}
    />
  )
}

export default SignUp
