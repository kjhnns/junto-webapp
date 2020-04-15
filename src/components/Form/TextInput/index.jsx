import React from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'

import { Box } from '@components/Grid'

import ErrorMessage from '../ErrorMessage'
import { Label, Hint } from '../Label'

import { Input } from './Input'

const TextInput = ({ label, hint, ...props }) => {
  const [field, meta] = useField(props)
  const { name } = props

  return (
    <Box width="100%">
      {label ? (
        <Label htmlFor={name}>
          {label} {hint && <Hint>{hint}</Hint>}
        </Label>
      ) : null}
      <Input
        id={name}
        hasError={meta.touched && meta.error}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </Box>
  )
}

TextInput.defaultProps = {
  label: '',
  hint: '',
  disabled: false,
}

TextInput.propTypes = {
  /** Name specifies for which value within a form this input is */
  name: PropTypes.string.isRequired,
  /** The label to display above the input */
  label: PropTypes.string,
  /** Smaller text inside the label */
  hint: PropTypes.string,
  /** Whether the TextInput is disabled */
  disabled: PropTypes.bool,
}

export default TextInput
