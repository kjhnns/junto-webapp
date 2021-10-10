import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import * as Yup from 'yup'

import { Box, Flex } from '@components/Grid'
import { Button } from '@components/Button'
import { Heading, Text } from '@components/Typography'
import { Formik, Form, Input } from '@components/Form'
import { Link } from '@components/Link'

const validationSchema = Yup.object().shape({
  label: Yup.string()
    .max(80)
    .required('Required'),
})

const PureEditTag = ({ tag, handleSubmit }) => {
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
          initialValues={tag}
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
              navigate(`/dashboard/tags`)
            }
            setSubmitting(false)
          }}
        >
          {({ handleSubmit: submit, isSubmitting }) => (
            <Form onSubmit={submit}>
              <Box maxWidth="500px" mx="auto">
                <Heading as="h1" fontSize={5} mb={3}>
                  Edit Motivation
                </Heading>
                <Box mb={3}>
                  <Text fontWeight="bold">Title</Text>
                  <Input name="label" />
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
                    {isSubmitting ? `Editing ...` : `Edit`}
                  </Button>
                  <Box pt={[2, 0]}>
                    <Button variant="clear" as={Link} to={`/dashboard/tags`}>
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

PureEditTag.propTypes = {
  tag: PropTypes.objectOf({
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export { PureEditTag }
