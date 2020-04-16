import React from 'react'

import { Box } from '@components/Grid'
import { Button } from '@components/Button'

const LoginAndSignupBanner = () => (
  <Box
    sx={{
      position: 'fixed',
      bottom: 0,
      boxShadow: 'xxlarge',
      width: '100%',
      p: 3,
      bg: 'gray.200',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }}
  >
    <Button mr={3}>Log in</Button>
    <Button variant="outline">Sign up</Button>
  </Box>
)

export { LoginAndSignupBanner }
