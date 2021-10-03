import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link as ReachLink } from '@reach/router'

import { HomeIcon } from './HomeIcon'
import { MotivationIcon } from './MotivationIcon'
import { SettingsIcon } from './SettingsIcon'

const gray = {
  100: 'hsl(10, 2%, 98%)',
  200: 'hsl(10, 2%, 90%)',
  300: 'hsl(10, 2%, 87%)',
  400: 'hsl(10, 2%, 83%)',
  500: 'hsl(10, 2%, 74%)',
  600: 'hsl(10, 2%, 63%)',
  700: 'hsl(10, 2%, 49%)',
  800: 'hsl(10, 2%, 30%)',
  900: 'hsl(10, 2%, 16%)',
}

const Small = ({ active }) => (
  <Box
    sx={{
      display: ['flex', 'none', null, null],
      position: 'fixed',
      bottom: 0,
      width: '100%',
      margin: 'auto',
      py: 3,
      pb: 'max( env(safe-area-inset-bottom), 16px)',
      flexDirection: 'row',
      justifyContent: 'center',
      bg: 'gray.900',
      color: 'white',
      borderTop: '1px solid #f2f2f2;',
    }}
  >
    <Box
      sx={{ mx: 4, color: 'white', textDecoration: 'none' }}
      as={ReachLink}
      to="/dashboard"
    >
      <Flex flexDirection="column" alignItems="center">
        <HomeIcon color={active === 'dashboard' ? gray[200] : gray[600]} />
        <Text
          mt={1}
          fontSize={0}
          sx={{ color: active === 'dashboard' ? 'gray.200' : 'gray.600' }}
        >
          Dashboard
        </Text>
      </Flex>
    </Box>

    <Box
      sx={{ mx: 4, color: 'white', textDecoration: 'none' }}
      as={ReachLink}
      to="/dashboard/tags"
    >
      <Flex flexDirection="column" alignItems="center">
        <MotivationIcon color={active === 'tags' ? gray[200] : gray[600]} />
        <Text
          mt={1}
          fontSize={0}
          sx={{ color: active === 'tags' ? 'gray.200' : 'gray.600' }}
        >
          Motivations
        </Text>
      </Flex>
    </Box>
    <Box
      sx={{ mx: 4, color: 'white', textDecoration: 'none' }}
      as={ReachLink}
      to="/settings"
    >
      <Flex flexDirection="column" alignItems="center">
        <SettingsIcon color={active === 'settings' ? gray[200] : gray[600]} />
        <Text
          mt={1}
          fontSize={0}
          sx={{ color: active === 'settings' ? 'gray.200' : 'gray.600' }}
        >
          Settings
        </Text>
      </Flex>
    </Box>
  </Box>
)

Small.propTypes = {
  active: PropTypes.string.isRequired,
}

export { Small }
