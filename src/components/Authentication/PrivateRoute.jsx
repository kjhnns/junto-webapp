/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react'
import { navigate } from 'gatsby'
import { isLoggedIn } from '../../util/auth'

const PrivateRoute = ({ component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/signin`) {
    navigate('/app/signin')
    return null
  }
  return <Component {...rest} />
}

export default PrivateRoute
