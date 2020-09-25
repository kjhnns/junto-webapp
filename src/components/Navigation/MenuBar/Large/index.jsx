import React from 'react'

import { Box } from '@components/Grid'

import Logo from './Logo'
import { Menu } from './Menu'

const Large = () => (
  <Box
    sx={{
      display: ['none', 'flex', null, null],
      width: '100%',
      maxWidth: '1800px',
      margin: 'auto',
      py: 3,
      flexDirection: 'row',
      bg: 'gray.900',
    }}
  >
    <Logo href="/dashboard" />
    <Menu />
  </Box>
)

export { Large }
