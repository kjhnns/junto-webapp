import React, { Component, useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { isLoggedIn } from '../../util/auth'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const [loggedIn, setLoggedIn] = useState(true)
  useEffect(() => {
    ;(async function() {
      const res = await isLoggedIn()
      setLoggedIn(res)
      if (!loggedIn && location.pathname !== `/app/signin`) {
        navigate('/app/signin')
        // console.log('user is not logged in')
      }
    })()
  })

  if (!loggedIn && location.pathname !== `/app/signin`) {
    return null
  }
  // console.log('user is logged in')
  return <Component {...rest} />
}

export default PrivateRoute
