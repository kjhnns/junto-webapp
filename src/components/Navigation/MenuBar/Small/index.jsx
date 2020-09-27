import React from 'react'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link as ReachLink } from '@reach/router'

import { Logo } from './Logo'
import { SettingsIcon } from './SettingsIcon'

const Small = ({ active }) => (
  <Box
    sx={{
      display: ['flex', 'none', null, null],
      position: 'fixed',
      bottom: 0,
      width: '100%',
      margin: 'auto',
      py: 2,
      flexDirection: 'row',
      justifyContent: 'center',
      bg: 'gray.900',
      color: 'white',
      boxShadow:
        '0 -10px 15px -3px rgba(0,0,0,0.1), 0 -4px 6px -2px rgba(0,0,0,0.05)',
    }}
  >
    <Box
      sx={{ mx: 4, color: 'white', textDecoration: 'none' }}
      as={ReachLink}
      to="/dashboard"
    >
      <Flex flexDirection="column" alignItems="center">
        <Logo />
        <Text
          mt={1}
          fontSize={0}
          sx={{ textDecoration: active === 'dashboard' ? 'underline' : 'none' }}
        >
          Dashboard
        </Text>
      </Flex>
    </Box>
    <Box
      sx={{ mx: 4, color: 'white', textDecoration: 'none' }}
      as={ReachLink}
      to="/settings"
    >
      <Flex flexDirection="column" alignItems="center">
        <SettingsIcon />
        <Text
          mt={1}
          fontSize={0}
          sx={{ textDecoration: active === 'settings' ? 'underline' : 'none' }}
        >
          Settings
        </Text>
      </Flex>
    </Box>
  </Box>
)

export { Small }
