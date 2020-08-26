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
import { resetPassword } from '@auth'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Not a valid email address')
    .required('Required'),
})

const PureResetPasswordPage = ({ errors, handleSubmit, isSubmitting }) => (
  <Layout>
    <SEO title="Reset Password" />
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
              Reset Password
            </Heading>
            <Box mb={3}>
              <Text fontWeight="bold">Email</Text>
              <Input name="email" />
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
                {isSubmitting ? `Resetting ...` : `Reset Password`}
              </Button>
              <Link to="/signup">Don&apos;t have an account yet?</Link>
            </Flex>
          </Box>
        </Form>
      </Box>
    </Box>
  </Layout>
)

PureResetPasswordPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
}

const ResetPasswordPage = withFormik({
  mapPropsToValues: () => ({
    email: '',
  }),
  validationSchema,
  handleSubmit: async (values, { setSubmitting, setErrors }) => {
    setErrors({ response: '' })
    setSubmitting(true)
    const result = await resetPassword(values)
    if (result.error) {
      setErrors({ response: result.message })
    }
    if (result.success) {
      setSubmitting(false)
      navigate('/')
    }
    setSubmitting(false)
  },
  displayName: 'Reset Password',
})(PureResetPasswordPage)

export { ResetPasswordPage as default, PureResetPasswordPage }
