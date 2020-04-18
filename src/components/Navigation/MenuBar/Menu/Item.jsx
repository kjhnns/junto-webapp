import styled, { themeGet } from '@style'

const Item = styled.div`
  display: flex;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 29px;
  text-transform: uppercase;

  a,
  a:link,
  a:visited,
  a:active {
    text-decoration: none;
    padding: 6px 8px;
    color: white !important;
  }

  @media (min-width: 568px) {
    margin: 0 11px;
  }

  @media (min-width: 800px) {
    margin: 0 22px;
  }
`

export default Item
