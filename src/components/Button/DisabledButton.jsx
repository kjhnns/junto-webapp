import React from 'react'
import PropTypes from 'prop-types'

import styled from '@style'

import baseStyles from './baseStyles'

const StyledButton = styled.button`
  ${baseStyles};
  color: #aebecd;
  background: #e1e7ec;
  cursor: default;
`

const DisabledButton = ({ children, ...props }) => (
  <StyledButton {...props} disabled>
    {children}
  </StyledButton>
)

DisabledButton.propTypes = {
  /* Click handler */
  onClick: PropTypes.func,
  /* Whether the Button should expand to full width */
  fullWidth: PropTypes.bool,
  /* Height of the Button */
  height: PropTypes.string,
  children: PropTypes.node,
}

DisabledButton.defaultProps = {
  fullWidth: false,
  height: '40px',
  onClick: null,
  children: null,
}

export default DisabledButton
