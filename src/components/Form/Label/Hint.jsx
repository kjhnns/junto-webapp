import styled, { css, themeGet } from '@style'

const defaultStyles = css`
  color: ${themeGet(`colors.grey.500`)};
`

const errorStyles = css`
  color: ${themeGet(`colors.form.common.error.hintTextColor`)};
`

const disabledStyles = css`
  color: ${themeGet(`colors.form.common.disabled.hintTextColor`)};
`

const getVariantStyles = ({ variant }) => {
  if (variant === 'error') {
    return errorStyles
  }
  if (variant === 'disabled') {
    return disabledStyles
  }
  return defaultStyles
}

const Hint = styled.small`
  display: inline-block;
  font-size: ${themeGet('fontSizes.1')};
  font-weight: ${themeGet('fontWeights.normal')};
  margin-bottom: 0;
  margin-left: ${themeGet('space.2')};
  /* stylelint-disable */
  ${props => getVariantStyles(props)} /* stylelint-enable */
`

export default Hint
