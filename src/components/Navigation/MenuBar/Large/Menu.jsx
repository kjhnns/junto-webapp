import React from 'react'
import { AppLink } from '@components/Link'
import { Flex, Box } from '@components/Grid'
import { getUser } from '@auth'

const Wrapper = {
  display: 'flex',
  flex: '0 0 auto',
  padding: [0, 0, 0, '0 22px'],
  alignItems: 'center',
  justifyContent: 'flex-end',
  minHeight: '100%',
}

const Menu = () => (
  <Flex sx={Wrapper}>
    <Box
      sx={{
        display: ['none', 'flex'],
        color: 'white',
        mr: [0, 2, 3, 4],
      }}
    >{`Hello, ${getUser().displayName}`}</Box>
    <Box mx={3}>
      <AppLink sx={{ textDecoration: 'none' }} to="/settings">
        <Flex
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRadius: '50%',
            bg: 'gray.100',
            p: 0,
            width: '35px',
            height: '35px',
            textTransform: 'uppercase',
            lineHeight: '0',
            fontWeight: 600,
          }}
        >{`${getUser().displayName[0]}`}</Flex>
      </AppLink>
    </Box>
  </Flex>
)

export { Menu }
