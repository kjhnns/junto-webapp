import React from 'react'
import { Flex } from '@components/Grid'
import { getUser } from '@auth'

const UserAvatar = () => (
  <Flex
    alignItems="center"
    justifyContent="center"
    sx={{
      borderRadius: '50%',
      bg: 'gray.300',
      p: 0,
      width: '35px',
      height: '35px',
      textTransform: 'uppercase',
      lineHeight: '0',
      color: 'gray.900',
      fontWeight: 800,
      fontSize: 3,
    }}
  >{`${getUser().displayName[0]}`}</Flex>
)

export { UserAvatar }
