import styled, { themeGet } from '@style'

const Wrapper = styled.div`
  background: ${themeGet('colors.white')};
  padding: ${themeGet('space.3')} ${themeGet('space.3')};
  margin-bottom: ${themeGet('space.4')};
`

export default Wrapper
