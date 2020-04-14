import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { SecondaryButton } from '@components/Button'
import { Flex, Box } from '@components/Grid'
import { TextInput } from '@components/Form'
import ErrorMessage from '@components/Form/ErrorMessage'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Not a valid email address')
    .required('Mandatory Field'),
  password: Yup.string()
    .required('Mandatory Field')
    .min(6, 'At least 6 characters long'),
})

const SignInForm = ({ submitHandler, errorMessage }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async values => {
        await submitHandler(values)
      }}
      render={() => (
        <Form>
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
            {errorMessage !== '' ? (
              <Box width={['90%', '350px', '350px']} mx={4} mt={4}>
                <ErrorMessage>{errorMessage}</ErrorMessage>
              </Box>
            ) : (
              ''
            )}
            <Box width={['90%', '350px', '350px']} mx={4} mt={4}>
              <SecondaryButton width="100%" type="submit">
                Sign In
              </SecondaryButton>
            </Box>
          </Flex>
        </Form>
      )}
    />
  )
}

SignInForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
}

SignInForm.defaultProps = {
  errorMessage: null,
}

export default SignInForm
