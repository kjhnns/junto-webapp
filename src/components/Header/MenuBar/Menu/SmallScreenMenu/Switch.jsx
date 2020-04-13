import styled, { themeGet } from '@style'

const SwitchLabel = styled.div`
  position: absolute;
  right: 55px;
  font-style: normal;
  font-weight: ${themeGet('fontWeights.semibold')};
  line-height: 16px;
  font-size: ${themeGet('fontSizes.1')};
  color: ${themeGet('colors.secondary.400')};
`

const Switch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`

export { Switch, SwitchLabel }
