/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'

const isLoggedIn = () => {
  return true
}

const PrivateRoute = ({ component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/login`) {
    navigate('/app/login')
    return null
  }
  return <component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

export default PrivateRoute
