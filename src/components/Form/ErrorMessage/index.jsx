import styled, { themeGet } from '@style'

const ErrorMessage = styled.div`
  display: block;
  position: relative;
  padding: 5px 0;
  color: ${themeGet(`colors.primary.600`)};
  font-size: ${themeGet('fontSizes.0')};
  line-height: ${themeGet('lineHeights.3')};
`

export default ErrorMessage
