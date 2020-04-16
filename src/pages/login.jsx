import React from 'react'

import { Layout } from '@components/Layout'
import { Box } from '@components/Grid'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Heading } from '@components/Typography'
import { Formik, Form, Input } from '@components/NewForm'
import * as Yup from 'yup'
import { globalHistory } from '@reach/router'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Not a valid email address')
    .required('required'),
  password: Yup.string().required('required'),
})

const LoginPage = () => (
  <Layout>
    <SEO title="Login" />
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        bg: 'gray.300',
        display: 'grid',
        alignItems: 'center',
      }}
    >
      <Box>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true)
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              actions.setSubmitting(false)
            }, 1000)
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Box maxWidth="500px" mx="auto">
                <Heading as="h1" fontSize={5} mb={3}>
                  Login
                </Heading>
                <Box mb={3}>
                  <Input name="email" />
                </Box>
                <Box mb={3}>
                  <Input name="password" type="password" />
                </Box>
                <Box>
                  <Button type="submit">
                    {isSubmitting ? `Loggin in...` : `Log in`}
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  </Layout>
)

export default LoginPage
