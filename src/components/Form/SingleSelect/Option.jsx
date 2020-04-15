/* stylelint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import GoogleAnalytics from 'react-ga'
import { useFormikContext } from 'formik'
import { Box } from '@components/Grid'
import styled, { css, themeGet } from '@styles'

const selectStyles = css`
  background: ${themeGet('colors.secondary.500')};
  box-shadow: 0 0 10px rgba(136, 136, 136, 0.25);
  border: 1px solid ${themeGet('colors.secondary.600')};
  color: ${themeGet('colors.white')};
`

const Item = styled.div`
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(136, 136, 136, 0.25);
  background: ${themeGet('colors.white')};
  border: 1px solid ${themeGet('colors.grey.300')};
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 4px;
  color: hsl(0, 0%, 30%);
  line-height: 160%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 130px;
  height: 80px;
  ${props => (props.selected ? selectStyles : null)}

  &:active {
    background: ${themeGet('colors.secondary.500')};
    color: ${themeGet('colors.white')};
  }
`

const Option = ({ children, name, value, onClick, ...props }) => {
  const context = useFormikContext()
  // eslint-disable-next-line react/destructuring-assignment
  const { [name]: currentSelected } = context.values

  return (
    <Box m={[2, 2, 3]}>
      <Item
        selected={value === currentSelected}
        onClick={() => {
          GoogleAnalytics.event({
            category: 'SingleSelect',
            action: `[selected] ${name} ${value}`,
          })

          if (onClick !== null) {
            onClick()
          }
          return context.setFieldValue(name, value)
        }}
        {...props}
      >
        {children}
      </Item>
    </Box>
  )
}

Option.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
}

Option.defaultProps = {
  children: null,
  onClick: null,
}

export default Option
