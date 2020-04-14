import React from 'react'
import { Link } from '@components/Link'
import Item from './Item'
import Wrapper from './Wrapper'
import MenuButton from './MenuButton'

const Menu = () => (
  <Wrapper>
    <MenuButton>
      <Link to="/app" from="layout header navigation">
        App
      </Link>
    </MenuButton>
    <Item>
      <Link to="about-us" from="layout header navigation">
        Info
      </Link>
    </Item>
    <Item>
      <Link to="faq" from="layout header navigation">
        FAQ
      </Link>
    </Item>
  </Wrapper>
)

export default Menu
