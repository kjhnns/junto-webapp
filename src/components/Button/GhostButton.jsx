import React from 'react'
import PropTypes from 'prop-types'
import styled, { themeGet } from '@style'
import baseStyles from './baseStyles'

const StyledButton = styled.button`
  ${baseStyles}
  background: transparent;
  color: ${themeGet('colors.primary.800')};
  box-shadow: 0 0 0 1px ${themeGet('colors.primary.500')};

  &:hover,
  &:focus {
    /* stylelint-disable */
    background: linear-gradient(
      180deg,
      ${themeGet('colors.primary.400')} 0%,
      ${themeGet('colors.primary.600')} 100%
    );
    /* stylelint-enable */
    box-shadow: none;
    color: ${themeGet('colors.white')};
  }
`

const GhostButton = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)

GhostButton.propTypes = {
  /* Click handler */
  onClick: PropTypes.func,
  /* Whether the Button should expand to full width */
  fullWidth: PropTypes.bool,
  /* Height of the Button */
  height: PropTypes.string,
  children: PropTypes.node,
}

GhostButton.defaultProps = {
  fullWidth: false,
  height: '40px',
  onClick: null,
  children: null,
}

export default GhostButton
