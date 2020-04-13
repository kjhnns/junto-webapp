import styled, { themeGet } from '@style'

const Item = styled.div`
  display: flex;
  justify-content: center;
  flex: 0 0 auto;
  cursor: pointer;
  padding-top: ${themeGet('space.5')};
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: ${themeGet('fontSizes.3')};
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;

  a,
  a:link,
  a:visited,
  a:active {
    text-decoration: none !important;
    padding: 6px 8px;
    color: ${themeGet('colors.grey.700')} !important;
  }
`

export default Item
