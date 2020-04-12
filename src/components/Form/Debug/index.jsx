/**
 * A simple component for debugging purposes. If you're not sure about the state
 * of your Formik form, use this component to display everything that's inside
 * the "Formik state"
 */
import React from 'react'
import { FormikConsumer } from 'formik'

import Container from './Container'
import Header from './Header'
import Code from './Code'

const Debug = () => (
  <Container>
    <Header>Formik State</Header>
    <FormikConsumer>
      {({ validationSchema, validate, onSubmit, ...rest }) => (
        <Code>{JSON.stringify(rest, null, 2)}</Code>
      )}
    </FormikConsumer>
  </Container>
)

export default Debug
