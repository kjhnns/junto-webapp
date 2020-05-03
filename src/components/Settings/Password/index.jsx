import React from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { withFormik } from 'formik'

import { updatePassword, signOut } from '@auth'
import { Layout } from '@components/Layout'
import { Box, Flex } from '@components/Grid'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Heading, Text } from '@components/Typography'
import { Form, Input } from '@components/NewForm'
import { Link } from '@components/Link'

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Required')
    .min(6, 'Must be at least 6 characters long'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Must be at least 6 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
})

const PurePasswordSettings = ({ errors, handleSubmit, isSubmitting }) => (
  <Layout>
    <SEO title="Change Password" />
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
            Change Password
          </Heading>
          <Box mb={3}>
            <Text fontWeight="bold">Current Password</Text>
            <Input type="password" name="currentPassword" />
          </Box>
          <Box mb={3}>
            <Text fontWeight="bold">New Password</Text>
            <Input type="password" name="password" />
          </Box>

          <Box mb={3}>
            <Text fontWeight="bold">Password Confirmation</Text>
            <Input type="password" name="confirmPassword" />
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
            flexDirection={['column-reverse', 'row']}
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant="clear" as={Link} to="/settings" pt={[4, 0]}>
              cancel
            </Button>
            <Button type="submit" width={['100%', 'auto']} mt={[3, 0]}>
              {isSubmitting ? `Changing ...` : `Change`}
            </Button>
          </Flex>
        </Box>
      </Form>
    </Box>
  </Layout>
)

const PasswordSettings = withFormik({
  mapPropsToValues: () => ({
    confirmPassword: '',
    currentPassword: '',
    password: '',
  }),
  validationSchema,
  handleSubmit: async (values, { setSubmitting, setErrors }) => {
    setErrors({ response: '' })
    setSubmitting(true)
    const result = await updatePassword(values)
    setSubmitting(false)
    if (!result.success) {
      setErrors({ response: result.description.message })
    }
    if (result.success) {
      await signOut()
    }
  },
  displayName: 'Change Password',
})(PurePasswordSettings)

PurePasswordSettings.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
}

export { PasswordSettings, PurePasswordSettings }
