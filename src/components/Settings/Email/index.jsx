import React from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { navigate } from 'gatsby'
import { withFormik } from 'formik'

import { updateEmail, getUser, handleLogin } from '@auth'
import { Layout } from '@components/Layout'
import { Box, Flex } from '@components/Grid'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Heading, Text } from '@components/Typography'
import { Form, Input } from '@components/Form'
import { Link } from '@components/Link'

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Required')
    .min(6, 'Must be at least 6 characters long'),
  email: Yup.string()
    .required('Required')
    .email('Must be a valid email address'),
})

const PureEmailSettings = ({ errors, handleSubmit, isSubmitting }) => (
  <Layout>
    <SEO title="Change Email" />
    <Box
      sx={{
        p: [3, 4],
        minHeight: '100vh',
        bg: 'gray.100',
        display: 'grid',
        alignItems: 'center',
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Box maxWidth="500px" mx="auto">
          <Heading as="h1" fontSize={5} mb={3}>
            Change Email Address
          </Heading>
          <Box mb={3}>
            <Text fontWeight="bold">Current Email Address</Text>
            <Text>{getUser().email}</Text>
          </Box>
          <Box mb={3}>
            <Text fontWeight="bold">New Email Address</Text>
            <Input type="text" name="email" />
          </Box>
          <Box mb={3}>
            <Text fontWeight="bold">Password</Text>
            <Input type="password" name="password" />
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
            <Button type="submit" width={['100%', 'auto']} mt={[3, 0]}>
              {isSubmitting ? `Changing ...` : `Change`}
            </Button>
            <Box pt={[3, 0]}>
              <Button variant="clear" as={Link} to="/settings">
                cancel
              </Button>
            </Box>
          </Flex>
        </Box>
      </Form>
    </Box>
  </Layout>
)

const EmailSettings = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema,
  handleSubmit: async (values, { setSubmitting, setErrors }) => {
    setErrors({ response: '' })
    setSubmitting(true)
    const result = await updateEmail(values)
    if (!result.success) {
      setErrors({ response: result.description.message })
    }
    if (result.success) {
      await handleLogin({
        email: await getUser().email,
        password: values.password,
      })
      await navigate('/settings')
    }
    setSubmitting(false)
  },
  displayName: 'Change Email',
})(PureEmailSettings)

PureEmailSettings.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.any.isRequired,
}

export { EmailSettings, PureEmailSettings }
