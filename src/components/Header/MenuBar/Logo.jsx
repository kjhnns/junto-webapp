import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@components/Link'
import { Flex } from '@components/Grid'
import styled from '@style'

const LogoLink = styled(Link)`
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  letter-spacing: 1px;
  color: rgb(60, 100, 125);
  font-size: 20px;
  text-decoration: none;
`

const LogoWrapper = styled(Flex)`
  flex: 1 1 auto;
  align-items: center;
  align-content: center;
  padding: 0 28px;
  justify-content: flex-start;
`

const Logo = ({ href }) => (
  <LogoWrapper>
    <LogoLink to={href} from="layout header logo">
      junto
    </LogoLink>
  </LogoWrapper>
)

Logo.propTypes = {
  href: PropTypes.string.isRequired,
}

export default Logo
