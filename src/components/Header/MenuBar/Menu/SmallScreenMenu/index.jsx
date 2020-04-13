import React, { useState } from 'react'

import { Link, OutboundLink } from '@components/Link'

import Menu from './Menu'
import SwitchIcon from './SwitchIcon'
import Overlay from './Overlay'
import Container from './Container'
import Wrapper from './Wrapper'
import { Switch, SwitchLabel } from './Switch'
import Item from './Item'
import ItemSmall from './ItemSmall'
import ItemHighlighted from './ItemHighlighted'
import Items from './Items'
import Divider from './Divider'

const SmallScreenMenu = () => {
  const [displayOverlay, setDisplayOverlay] = useState(false)
  const toggleMenu = () => {
    setDisplayOverlay(!displayOverlay)
    if (!displayOverlay) {
      document.body.classList.add('noscroll')
    } else {
      document.body.classList.remove('noscroll')
    }
  }

  return (
    <Menu>
      <Switch onClick={toggleMenu}>
        <SwitchLabel>{displayOverlay ? 'Close' : 'Menu'}</SwitchLabel>
        <SwitchIcon active={displayOverlay} />
      </Switch>
      {displayOverlay && (
        <Wrapper>
          <Overlay>
            <Container>
              <Items>
                <ItemHighlighted onClick={toggleMenu}>
                  <Link to="/application" from="layout header navigation">
                    APPLY NOW
                  </Link>
                </ItemHighlighted>
                <Item onClick={toggleMenu}>
                  <Link to="about-us" from="layout header navigation">
                    ABOUT US
                  </Link>
                </Item>
                <Item onClick={toggleMenu}>
                  <Link to="faq" from="layout header navigation">
                    FAQ
                  </Link>
                </Item>
                <Item onClick={toggleMenu}>
                  <Link to="privacy-notice" from="layout header navigation">
                    PRIVACY NOTICE
                  </Link>
                </Item>
                <Divider />
                <ItemSmall>
                  <OutboundLink to="https://instagram.com/strydecanada/">
                    instagram
                  </OutboundLink>
                </ItemSmall>
                <ItemSmall>
                  <OutboundLink to="https://www.facebook.com/strydecanada/">
                    facebook
                  </OutboundLink>
                </ItemSmall>
              </Items>
            </Container>
          </Overlay>
        </Wrapper>
      )}
    </Menu>
  )
}

export default SmallScreenMenu
