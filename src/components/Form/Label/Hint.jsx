import styled, { themeGet } from '@style'

const Hint = styled.small`
  display: inline-block;
  font-size: ${themeGet('fontSizes.1')};
  font-weight: ${themeGet('fontWeights.normal')};
  margin-bottom: 0;
  margin-left: ${themeGet('space.2')};
  color: ${themeGet(`colors.grey.500`)};
`

export { Hint }
