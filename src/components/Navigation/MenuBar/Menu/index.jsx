import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from '@reach/router'
import { Flex, Box } from '@components/Grid'
import Item from './Item'
import MenuButton from './MenuButton'
import { isLoggedIn, getUser } from '../../../../util/auth'

const Wrapper = {
  display: 'flex',
  flex: '0 0 auto',
  padding: [0, 0, 0, '0 22px'],
  alignItems: 'center',
  justifyContent: 'flex-end',
  minHeight: '100%',
}

const MenuLoggedOut = () => (
  <Flex sx={Wrapper}>
    <MenuButton>
      <Link to="/login">Sign In</Link>
    </MenuButton>
    <Item>
      <Link to="/signup">Sign Up</Link>
    </Item>
  </Flex>
)
const MenuLoggedIn = () => (
  <Flex sx={Wrapper}>
    <Box
      sx={{
        display: ['none', 'flex'],
        color: 'white',
        mr: [0, 2, 3, 4],
      }}
    >{`Hello, ${getUser().displayName}`}</Box>
    <MenuButton>
      <Link to="/dashboard">Dashboard</Link>
    </MenuButton>
    <MenuButton>
      <Link to="/settings">Settings</Link>
    </MenuButton>
  </Flex>
)

const Menu = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line func-names
    ;(async function() {
      const res = await isLoggedIn()
      setLoggedIn(res)
    })()
  })

  return (
    <Flex sx={Wrapper}>{loggedIn ? <MenuLoggedIn /> : <MenuLoggedOut />}</Flex>
  )
}

export default Menu
