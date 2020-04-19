import React from 'react'

import { Box, Flex } from '@components/Grid'
import { Link } from '@components/Link'

const HeaderLoading = () => {
  return (
    <Box
      sx={{
        bg: 'gray.900',
        width: '100%',
      }}
    >
      <Flex
        sx={{
          maxWidth: '800px',
          m: 'auto',
          p: 3,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'top',
        }}
      >
        <Link sx={{ color: 'white', fontWeight: '600' }} to="/dashboard">
          close
        </Link>
      </Flex>
    </Box>
  )
}

export { HeaderLoading }
