import React from 'react'
import PropTypes from 'prop-types'
import { useField, useFormikContext } from 'formik'

import { Flex, Box } from '@components/Grid'

import ErrorMessage from '../ErrorMessage'
import { Label } from '../Label'

import Checkbox from './Checkbox'

const CheckboxField = ({ children, ...props }) => {
  const [field, meta] = useField(props)
  const { name } = props
  const form = useFormikContext()
  const { [name]: currentValue } = form.values

  return (
    <Box width="100%">
      <Flex flexDirection="row">
        <Checkbox
          type="checkbox"
          id={name}
          checked={currentValue ? 'checked' : ''}
          onClick={() => {
            if (currentValue) {
              form.setFieldValue(name, false)
            } else {
              form.setFieldValue(name, true)
            }
          }}
          {...field}
          {...props}
          meta={meta}
        />
        <Flex flexDirection="column">
          {children ? <Label htmlFor={name}>{children}</Label> : null}
          {meta.touched && meta.error ? (
            <ErrorMessage>{meta.error}</ErrorMessage>
          ) : null}
        </Flex>
      </Flex>
    </Box>
  )
}

CheckboxField.defaultProps = {
  children: '',
}

CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default CheckboxField
