import styled, { themeGet } from '@style'

const ItemHighlighted = styled.div`
  display: flex;
  justify-content: center;
  flex: 0 0 auto;
  cursor: pointer;
  padding-top: ${themeGet('space.5')};
  font-style: normal;
  font-weight: 600;
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
    color: ${themeGet('colors.secondary.400')} !important;
  }
`

export default ItemHighlighted
