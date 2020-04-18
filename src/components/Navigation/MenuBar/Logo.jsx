import React from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link as ReachLink } from '@reach/router'
import { Link as RebassLink } from 'rebass'
import { Box, Flex } from '@components/Grid'
import LogoImage from './logo.svg'

const Logo = ({ href }) => (
  <Flex
    sx={{
      flex: '1 1 auto',
      alignItems: 'center',
      alignContent: 'center',
      padding: ['0 20px', '0 28px'],
      justifyContent: 'flex-start',
    }}
  >
    <RebassLink as={ReachLink} to={href} sx={{ textDecoration: 'none' }}>
      <Box
        sx={{
          minHeight: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <Box p={0} m={0} height="35px">
          <img
            height="35px"
            src={LogoImage}
            alt="junto - social habit tracking"
          />{' '}
        </Box>
        <Box
          sx={{
            pl: 3,
            letterSpacing: '1px',
            color: 'gray.100',
            fontSize: '20px',
            display: ['none', 'flex'],
          }}
        >
          junto
        </Box>
      </Box>
    </RebassLink>
  </Flex>
)

Logo.propTypes = {
  href: PropTypes.string.isRequired,
}

export default Logo
