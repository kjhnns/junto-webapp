import React from 'react'
import { AppLink } from '@components/Link'
import { Flex } from '@components/Grid'
import { getUser } from '@auth'

const UserAvatar = () => (
  <AppLink sx={{ textDecoration: 'none' }} to="/settings">
    <Flex
      alignItems="center"
      justifyContent="center"
      sx={{
        borderRadius: '50%',
        bg: 'gray.300',
        p: 0,
        width: '40px',
        height: '40px',
        textTransform: 'uppercase',
        lineHeight: '0',
        fontWeight: 800,
        fontSize: 3,
      }}
    >{`${getUser().displayName[0]}`}</Flex>
  </AppLink>
)

export { UserAvatar }
