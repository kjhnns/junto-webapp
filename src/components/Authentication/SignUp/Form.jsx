import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Button } from '@components/Button'
import { Flex, Box } from '@components/Grid'
import { TextInput } from '@components/Form'
import ErrorMessage from '@components/Form/ErrorMessage'

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

const SignUpForm = ({ submitHandler, errorMessage }) => {
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async values => {
        await submitHandler(values)
      }}
      render={() => (
        <Form>
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
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

              {errorMessage !== '' ? (
                <Box width={['90%', '350px', '350px']} mx={4} mt={4}>
                  <ErrorMessage>{errorMessage}</ErrorMessage>
                </Box>
              ) : (
                ''
              )}
              <Box width={['90%', '350px', '350px']} mx={4} mt={4}>
                <Button width="100%" type="submit">
                  Get Started
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Form>
      )}
    />
  )
}

SignUpForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
}

SignUpForm.defaultProps = {
  errorMessage: null,
}

export default SignUpForm
