import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import axios from 'axios'
import * as Yup from 'yup'

import { getIdToken } from '@auth'
import { Layout } from '@components/Layout'
import { Box, Flex } from '@components/Grid'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Heading, Text } from '@components/Typography'
import { Formik, Form, Input } from '@components/NewForm'
import { Link } from '@components/Link'

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .max(80)
    .required('Required'),
})

const PureEditHabit = ({ handleSubmit }) => {
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <Layout>
      <SEO title="New habit" />
      <Box
        sx={{
          p: [3, 4],
          minHeight: '100vh',
          bg: 'gray.100',
          display: 'grid',
          alignItems: 'center',
        }}
      >
        <Box>
          <Formik
            initialValues={{
              title: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setErrorMessage('')
              setSubmitting(true)
              const response = await handleSubmit(values)
              if (response.error) {
                setErrorMessage(response.description)
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
                    New habit
                  </Heading>
                  <Box mb={3}>
                    <Text fontWeight="bold">Title</Text>
                    <Input name="title" />
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
                    <Button type="submit" width={['100%', 'auto']}>
                      {isSubmitting ? `Creating ...` : `Create`}
                    </Button>
                    <Box pt={[2, 0]}>
                      <Button variant="clear" as={Link} to="/dashboard">
                        cancel
                      </Button>
                    </Box>
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

PureEditHabit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

const UpdateHabit = async ({ title }) => {
  try {
    const idToken = await getIdToken()
    const result = await axios.post(
      `${process.env.GATSBY_API_URL}/action`,
      { title },
      {
        headers: {
          Bearer: idToken,
        },
      }
    )
    if (result.status !== 200) {
      return { error: true, message: result.data.message }
    }
    return { success: true }
  } catch (error) {
    return { error: true, message: error.message }
  }
}

const EditHabit = () => {
  return <PureEditHabit handleSubmit={UpdateHabit} />
}

export { EditHabit, PureEditHabit }