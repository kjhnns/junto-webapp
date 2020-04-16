import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import * as Yup from 'yup'

import { Layout } from '@components/Layout'
import { Box, Flex } from '@components/Grid'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Heading, Text } from '@components/Typography'
import { Formik, Form, Input } from '@components/NewForm'
import { Link } from '@components/Link'
import { handleSignup } from '@auth'

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string()
    .email('Please provide a valid email address')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Must be at least 6 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
})

const PureSignupPage = ({ handleSubmit }) => {
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <Layout>
      <SEO title="Signup" />
      <Box
        sx={{
          p: 4,
          minHeight: '100vh',
          bg: 'gray.100',
          display: 'grid',
          alignItems: 'center',
        }}
      >
        <Box>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setErrorMessage('')
              setSubmitting(true)
              const response = await handleSubmit(values)
              if (response.error) {
                setErrorMessage(response.message)
              }
              if (response.success) {
                setSubmitting(false)
                navigate('/dashboard')
              }
              setSubmitting(false)
            }}
          >
            {({ handleSubmit: submit, isSubmitting }) => (
              <Form onSubmit={submit}>
                <Box maxWidth="500px" mx="auto">
                  <Heading as="h1" fontSize={5} mb={3}>
                    Signup
                  </Heading>
                  <Box mb={3}>
                    <Text fontWeight="bold">Username</Text>
                    <Input name="username" />
                  </Box>
                  <Box mb={3}>
                    <Text fontWeight="bold">Email</Text>
                    <Input name="email" />
                  </Box>
                  <Box mb={3}>
                    <Text fontWeight="bold">Password</Text>
                    <Input name="password" type="password" />
                  </Box>
                  <Box mb={3}>
                    <Text fontWeight="bold">Confirm Password</Text>
                    <Input name="confirmPassword" type="password" />
                  </Box>
                  {errorMessage && (
                    <Box
                      sx={{
                        p: 3,
                        mb: 3,
                        bg: 'red.200',
                        color: 'red.900',
                        borderRadius: 'default',
                      }}
                    >
                      <Text>{errorMessage}</Text>
                    </Box>
                  )}
                  <Flex
                    flexDirection={['column', 'row']}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Button type="submit" width={['100%', 'auto']} mb={[3, 0]}>
                      {isSubmitting ? `Signing up...` : `Sign up`}
                    </Button>
                    <Link to="/login">Already have an account?</Link>
                  </Flex>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Layout>
  )
}

PureSignupPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

const LoginPage = () => {
  return <PureSignupPage handleSubmit={handleSignup} />
}

export default LoginPage
