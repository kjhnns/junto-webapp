import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { withFormik } from 'formik'
import * as Yup from 'yup'

import { Layout } from '@components/Layout'
import { Box, Flex } from '@components/Grid'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Heading, Text } from '@components/Typography'
import { Form, Input } from '@components/Form'
import { Link } from '@components/Link'
import { handleLogin } from '@auth'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Not a valid email address')
    .required('Required'),
  password: Yup.string().required('Required'),
})

const PureLoginPage = ({ errors, handleSubmit, isSubmitting }) => (
  <Layout>
    <SEO title="Login" />
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
              Login
            </Heading>
            <Box mb={3}>
              <Text fontWeight="bold">Email</Text>
              <Input name="email" />
            </Box>
            <Box mb={3}>
              <Text fontWeight="bold">Password</Text>
              <Input name="password" type="password" />
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
                {isSubmitting ? `Loggin in...` : `Log in`}
              </Button>
              <Link mt={[4, 0]} to="/signup">
                Don&apos;t have an account yet?
              </Link>
              <Link mt={[4, 0]} to="/resetpw">
                Lost your password?
              </Link>
            </Flex>
          </Box>
        </Form>
      </Box>
    </Box>
  </Layout>
)

PureLoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
}

const LoginPage = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema,
  handleSubmit: async (values, { setSubmitting, setErrors }) => {
    setErrors({ response: '' })
    setSubmitting(true)
    const result = await handleLogin(values)
    if (result.error) {
      setErrors({ response: result.message })
    }
    if (result.success) {
      setSubmitting(false)
      navigate('/dashboard')
    }
    setSubmitting(false)
  },
  displayName: 'Login',
})(PureLoginPage)

export { LoginPage as default, PureLoginPage }
