import React from 'react'
import { Link } from '@reach/router'
import Item from './Item'
import Wrapper from './Wrapper'
import MenuButton from './MenuButton'

const Menu = () => (
  <Wrapper>
    <MenuButton>
      <Link to="/app/signin" from="layout header navigation">
        Sign In
      </Link>
    </MenuButton>
    <Item>
      <Link to="/app/signup" from="layout header navigation">
        Sign Up
      </Link>
    </Item>
  </Wrapper>
)

export default Menu
