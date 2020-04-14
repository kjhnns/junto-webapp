/* eslint-disable */
import React, { Component } from 'react'
import { navigate } from 'gatsby'
import { isLoggedIn } from '../../util/auth'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/signin`) {
    navigate('/app/signin')
    console.log('user is not logged in')
    return null
  }
  console.log('user is logged in')
  return <Component {...rest} />
}

export default PrivateRoute
