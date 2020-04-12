import React from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import { Flex } from '@components/Grid'

import ErrorMessage from '../ErrorMessage'

const SingleSelect = ({ children, name }) => {
  const [field, meta] = useField(name)
  return (
    <>
      <Flex
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        {...field}
        meta={meta}
      >
        {children}
      </Flex>
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </>
  )
}

SingleSelect.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
}

SingleSelect.defaultProps = {
  children: null,
}

export default SingleSelect
