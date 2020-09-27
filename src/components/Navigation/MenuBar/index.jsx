import React from 'react'

import { Small } from './Small'
import { Large } from './Large'

const MenuBar = ({ active }) => (
  <>
    <Small active={active} />
    <Large />
  </>
)

export default MenuBar
