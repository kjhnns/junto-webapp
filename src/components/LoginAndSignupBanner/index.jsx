import React from 'react'
import { Link } from 'gatsby'

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
    <Button as={Link} to="/login" mr={3}>
      Log in
    </Button>
    <Button as={Link} to="/signup" variant="outline">
      Sign up
    </Button>
  </Box>
)

export { LoginAndSignupBanner }
