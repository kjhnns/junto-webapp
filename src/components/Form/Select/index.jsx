/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'

import { Box } from '@components/Grid'

import ErrorMessage from '../ErrorMessage'
import { Label, Hint } from '../Label'

import SelectField from './Select'

const Select = ({ children, label, hint, ...props }) => {
  const [field, meta] = useField(props)
  const { name } = props

  return (
    <Box width="100%">
      {label ? <Label htmlFor={name}>{label}</Label> : null}
      <SelectField id={name} {...field} {...props} meta={meta}>
        {children}
      </SelectField>
      {hint !== null && <Hint>{hint}</Hint>}
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </Box>
  )
}

Select.defaultProps = {
  label: '',
  hint: null,
}

Select.propTypes = {
  /* Name specifies for which value within a form this input is */
  name: PropTypes.string.isRequired,
  /* The label to display above the input */
  label: PropTypes.string,
  /* Smaller text inside the label */
  hint: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Select
