import React from 'react'
import PropTypes from 'prop-types'

import { Small } from './Small'
import { Large } from './Large'

const MenuBar = ({ active }) => (
  <>
    <Small active={active} />
    <Large />
  </>
)

MenuBar.propTypes = {
  active: PropTypes.string.isRequired,
}

export default MenuBar
