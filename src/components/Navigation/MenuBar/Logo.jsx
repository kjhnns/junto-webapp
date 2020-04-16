import React from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from '@reach/router'
import { Box, Flex } from '@components/Grid'
import styled, { themeGet } from '@style'
import LogoImage from './logo.svg'

const LogoLink = styled(Link)`
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  letter-spacing: 1px;
  color: ${themeGet('colors.primary.400')};
  font-size: 20px;
  text-decoration: none;
`

const LogoWrapper = styled(Flex)`
  flex: 1 1 auto;
  align-items: center;
  align-content: center;
  padding: 0 28px;
  justify-content: flex-start;
  display: none;

  @media (min-width: 800px) {
    display: flex;
  }
`

const Logo = ({ href }) => (
  <LogoWrapper>
    <LogoLink to={href} from="layout header logo">
      <Box p={0} m={0} height="45px">
        <img
          height="45px"
          src={LogoImage}
          alt="junto - social habit tracking"
        />{' '}
      </Box>
      <Box pl={3}>junto</Box>
    </LogoLink>
  </LogoWrapper>
)

Logo.propTypes = {
  href: PropTypes.string.isRequired,
}

export default Logo
