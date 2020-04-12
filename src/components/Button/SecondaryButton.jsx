/* eslint-disable react/jsx-props-no-spreading */
/* stylelint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, themeGet } from '@style'
import baseStyles from './baseStyles'

const increased = css`
  padding: 0.6em 3em;
  width: auto;
  font-size: 22px;
  font-weight: 340;
  white-space: nowrap;
`

const StyledButton = styled.button`
  ${baseStyles}
  background: none;
  color: ${themeGet('colors.primary.400')};
  border: 1px solid ${themeGet('colors.primary.400')};
  ${props => (props.big === true ? increased : '')}

  &:active {
    background: ${themeGet('colors.primary.400')};
    color: ${themeGet('colors.white')};
  }
`

const SecondaryButton = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)

SecondaryButton.propTypes = {
  /* Click handler */
  onClick: PropTypes.func,
  /* Whether the Button should expand to full width */
  fullWidth: PropTypes.bool,
  /* Height of the Button */
  height: PropTypes.string,
  children: PropTypes.node,
}

SecondaryButton.defaultProps = {
  fullWidth: false,
  height: '40px',
  children: null,
  onClick: null,
}

export default SecondaryButton
