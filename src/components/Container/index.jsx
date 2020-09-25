import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@components/Grid'

const widths = {
  fullWidth: '100%',
  default: '800px',
}

const Container = ({ children, width }) => (
  <Box maxWidth={widths[width]} width="100%">
    {children}
  </Box>
)

Container.defaultProps = {
  width: 'default',
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOf(['fullWidth', 'default']),
}

export { Container }
