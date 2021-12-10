import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import * as Yup from 'yup'

import { Habit } from '@api'
import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { Box, Flex } from '@components/Grid'
import { Button } from '@components/Button'
import { Heading, Text } from '@components/Typography'
import { Formik, Form, Input, Textarea } from '@components/Form'
import { Link } from '@components/Link'

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .max(80)
    .required('Required'),
  description: Yup.string().max(200),
})

const PureCreateNewHabit = ({ handleSubmit }) => {
  const [errorMessage, setErrorMessage] = useState('')

  return (
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
                <Box mb={3}>
                  <Text fontWeight="bold">Recipe</Text>
                  <Textarea
                    name="description"
                    placeholder="After/Before/When I ..., I will ..."
                  />
                  <Text fontSize={1}>
                    (After/Before/When I ..., I will ...)
                  </Text>
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
  )
}

PureCreateNewHabit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

const CreateNewHabit = () => {
  return (
    <Layout>
      <SEO title="New habit" />
      <PureCreateNewHabit handleSubmit={Habit.create} />
    </Layout>
  )
}

export { CreateNewHabit, PureCreateNewHabit }
