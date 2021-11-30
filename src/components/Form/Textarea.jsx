import React from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import { Textarea as RebassTextarea } from '@rebass/forms'

import { Text } from '@components/Typography'

const StyledTextarea = props => (
  <RebassTextarea
    {...props}
    sx={{
      borderRadius: 'default',
      boxShadow: 'inset 0 0 0 1px',
      minHeight: '50px',
    }}
  />
)

const Textarea = ({ ...props }) => {
  const [field, meta] = useField(props)
  const { name } = props

  return (
    <>
      <StyledTextarea id={name} {...field} {...props} />
      {meta.touched && meta.error ? <Text>{meta.error}</Text> : null}
    </>
  )
}

Textarea.propTypes = {
  /** Name specifies for which value within a form this Textarea is */
  name: PropTypes.string.isRequired,
}

export { Textarea }
