import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import * as Yup from 'yup'
import { withFormik } from 'formik'

import { Layout } from '@components/Layout'
import { Box, Flex } from '@components/Grid'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Heading, Text } from '@components/Typography'
import { Form, Input } from '@components/Form'
import { Link } from '@components/Link'
import { handleSignup, handleLogin } from '@auth'

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

const sendSignUpEvent = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'sign_up' })
  }
}

const PureSignupPage = ({ errors, handleSubmit, isSubmitting }) => (
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
        <Form onSubmit={handleSubmit}>
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
            {errors.response && (
              <Box
                sx={{
                  p: 3,
                  mb: 3,
                  bg: 'red.200',
                  color: 'red.900',
                  borderRadius: 'default',
                }}
              >
                <Text>{errors.response}</Text>
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
      </Box>
    </Box>
  </Layout>
)

PureSignupPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
}

const Signup = withFormik({
  mapPropsToValues: () => ({
    email: '',
    confirmPassword: '',
    password: '',
    username: '',
  }),
  validationSchema,
  handleSubmit: async (values, { setSubmitting, setErrors }) => {
    setErrors({ response: '' })
    setSubmitting(true)
    const result = await handleSignup(values)
    setSubmitting(false)
    if (!result.success) {
      setErrors({ response: result.message })
    }
    if (result.success) {
      sendSignUpEvent()
      await handleLogin(values)
      await navigate('/dashboard')
    }
  },
  displayName: 'Sign Up Page',
})(PureSignupPage)

export default Signup
