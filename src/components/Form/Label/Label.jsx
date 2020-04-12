import styled, { themeGet } from '@style'

// const errorStyles = css`
//   color: ${themeGet(`colors.form.common.error.labelTextColor`)};
// `

// const disabledStyles = css`
//   color: ${themeGet(`colors.form.common.disabled.labelTextColor`)};
// `

const Label = styled.label`
  display: inline-block;
  font-size: ${themeGet('fontSizes.2')};
  font-weight: ${themeGet('fontWeights.normal')};
  margin-bottom: ${themeGet('space.1')};
  color: ${themeGet(`colors.grey.600`)};
`

export default Label
