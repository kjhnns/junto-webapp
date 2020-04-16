import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { navigate } from 'gatsby'
import { isLoggedIn } from '@auth'

const PrivateRoute = ({ component: Component, ...props }) => {
  const [authState, setAuthState] = useState('INITIAL')
  useEffect(() => {
    async function checkStatus() {
      const isAuthenticated = await isLoggedIn()
      setAuthState(isAuthenticated ? 'AUTHENTICATED' : 'NOT_AUTHENTICATED')
    }

    checkStatus()
  }, [])

  /** Async call has not resolved/reject yet, show nothing */
  if (authState === 'INITIAL') {
    return null
  }

  /** User is not logged in, redirect to login page */
  if (authState === 'NOT_AUTHENTICATED') {
    navigate('/login', { replace: true })
    return null
  }

  return <Component {...props} />
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
}

export { PrivateRoute }
