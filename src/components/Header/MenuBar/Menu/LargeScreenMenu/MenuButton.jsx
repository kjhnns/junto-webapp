import styled, { themeGet } from '@style'

const MenuButton = styled.div`
  display: flex;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 29px;
  text-transform: uppercase;

  a,
  a:link,
  a:visited,
  a:active {
    text-decoration: none;
    padding: 6px 8px;
    color: ${themeGet('colors.primary.600')} !important;
  }

  @media (min-width: ${themeGet('breakpoints.0')}) {
    margin: 0 11px;
  }

  @media (min-width: ${themeGet('breakpoints.2')}) {
    margin: 0 22px;
  }
`

export default MenuButton
