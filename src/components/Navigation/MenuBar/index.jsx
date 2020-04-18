import React from 'react'

import { Flex } from '@components/Grid'

import Logo from './Logo'
import Menu from './Menu'

const MenuBar = () => (
  <Flex
    sx={{
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
  </Flex>
)

export default MenuBar
