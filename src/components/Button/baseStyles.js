import { space, width, fontSize } from 'styled-system'
import { css, themeGet } from '@style'

const baseStyles = css`
  display: flex;
  width: ${props => props.fullWidth && '100%'};
  cursor: pointer;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.height || '40px'};
  padding: 0.6em 2em;
  font-size: ${themeGet('fontSizes.2')};
  font-weight: ${themeGet('fontWeights.normal')};
  border-radius: 5px;
  outline: 0;
  border: none;
  text-decoration: none;
  ${space}
  ${width}
  ${fontSize}

  svg {
    width: 16px;
    margin-right: 8px;
  }
`

export default baseStyles
