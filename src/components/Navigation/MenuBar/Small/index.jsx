import React from 'react'

import { Box } from '@components/Grid'

const Small = () => (
  <Box
    sx={{
      display: ['flex', 'none', null, null],
      position: 'fixed',
      bottom: 0,
      width: '100%',
      maxWidth: '1800px',
      margin: 'auto',
      py: 3,
      flexDirection: 'row',
      bg: 'gray.900',
    }}
  >
    Test
  </Box>
)

export { Small }
