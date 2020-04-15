/* stylelint-disable */
import styled, { css, themeGet } from '@style'

const errorstyles = css`
  border-color: ${themeGet('colors.red.500')};
`

const Input = styled.input`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: white;
  background-clip: padding-box;
  border: 1px solid ${themeGet('colors.grey.600')};
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    color: #495057;
    background-color: white;
  }

  &::placeholder {
    color: hsl(0, 0%, 50%);
  }

  ${props => (props.error ? errorstyles : null)};
`

export { Input }
