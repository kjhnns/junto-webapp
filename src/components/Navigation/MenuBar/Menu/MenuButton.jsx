import styled from '@style'

const MenuButton = styled.div`
  display: flex;
  margin: 0;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;

  a,
  a:link,
  a:visited,
  a:active {
    padding: 6px 8px;
    color: white !important;
  }

  @media {
    margin: 0 11px;
  }

  @media (min-width: 800px) {
    margin: 0 22px;
  }
`

export default MenuButton
