import React from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link as ReachLink } from '@reach/router'
import { Link as RebassLink } from 'rebass'
import { Box } from '@components/Grid'
import LogoImage from './logo.svg'

const Logo = ({ href }) => (
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
      <Box p={0} m={0} height="40px">
        <img
          height="40px"
          src={LogoImage}
          alt="junto - social habit tracking"
        />
      </Box>
    </Box>
  </RebassLink>
)

Logo.propTypes = {
  href: PropTypes.string.isRequired,
}

export { Logo }
