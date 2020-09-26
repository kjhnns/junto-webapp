import React from 'react'
import { Box } from '@components/Grid'

import { Logo } from './Logo'
import { UserAvatar } from './UserAvatar'

const Small = () => (
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
      bg: 'gray.800',
      boxShadow:
        '0 -10px 15px -3px rgba(0,0,0,0.1), 0 -4px 6px -2px rgba(0,0,0,0.05)',
    }}
  >
    <Box mx={4}>
      <Logo href="/dashboard" />
    </Box>
    <Box mx={4}>
      <UserAvatar />
    </Box>
  </Box>
)

export { Small }
