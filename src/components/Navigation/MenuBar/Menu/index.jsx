import React, { useEffect, useState } from 'react'
import { Link } from '@reach/router'
import Item from './Item'
import Wrapper from './Wrapper'
import MenuButton from './MenuButton'
import { isLoggedIn, getUser } from '../../../../util/auth'

const MenuLoggedOut = () => (
  <Wrapper>
    <MenuButton>
      <Link to="/login">Sign In</Link>
    </MenuButton>
    <Item>
      <Link to="/signup">Sign Up</Link>
    </Item>
  </Wrapper>
)
const MenuLoggedIn = () => (
  <Wrapper>
    {`Hello, ${getUser().displayName}`}
    <MenuButton>
      <Link to="/app/dashboard">Dashboard</Link>
    </MenuButton>
    {/* <Item>
      <Link onClick={signOut}>Sign Out</Link>
    </Item> */}
  </Wrapper>
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

  return <Wrapper>{loggedIn ? <MenuLoggedIn /> : <MenuLoggedOut />}</Wrapper>
}

export default Menu
