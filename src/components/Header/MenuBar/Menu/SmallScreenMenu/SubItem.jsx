import styled, { themeGet } from '@style'

const SubItem = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 0 0 auto;
  cursor: pointer;
  padding-top: ${themeGet('space.4')};
  padding-right: ${themeGet('space.5')};
  font-style: normal;
  font-weight: ${themeGet('fontWeights.normal')};
  line-height: normal;
  font-size: ${themeGet('fontSizes.3')};
  color: #516bad;

  a {
    text-decoration: none;
    color: #516bad !important;
  }
`

export default SubItem
