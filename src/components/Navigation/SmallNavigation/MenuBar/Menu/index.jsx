import React from 'react'
import { Link } from '@reach/router'
import Item from './Item'
import Wrapper from './Wrapper'
import MenuButton from './MenuButton'
import { isLoggedIn } from '../../../../../util/auth'

const MenuLoggedOut = () => (
  <Wrapper>
    <MenuButton>
      <Link to="/app/signin">Sign In</Link>
    </MenuButton>
    <Item>
      <Link to="/app/signup">Sign Up</Link>
    </Item>
  </Wrapper>
)
const MenuLoggedIn = () => (
  <Wrapper>
    <MenuButton>
      <Link to="/app/dashboard">Dashboard</Link>
    </MenuButton>
  </Wrapper>
)

const Menu = () => {
  const loggedIn = isLoggedIn()
  return <Wrapper>{loggedIn ? <MenuLoggedIn /> : <MenuLoggedOut />}</Wrapper>
}

export default Menu
