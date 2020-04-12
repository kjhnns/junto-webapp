import React from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { SecondaryButton } from '@components/Button'
import { Flex, Box } from '@components/Grid'
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

const send = async ({ username, password, email }) => {
  const response = await axios.post(`${process.env.SERVER_URL}/user/signup`, {
    username,
    password,
    email,
  })
  return response
}

const SubmitHandler = async values => {
  const response = await send(values)
  console.log(response)
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
            m={[3, 5, 5]}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <h1>Create a new account</h1>
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
              <Box width={['90%', '350px', '350px']} mx={4} mt={[4, 0, 0]}>
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
