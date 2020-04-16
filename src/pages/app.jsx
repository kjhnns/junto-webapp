import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router'
import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import Dashboard from '@components/Dashboard'
import PrivateRoute from '@components/Authentication/PrivateRoute'
import SignUp from '@components/Authentication/SignUp'
import SignIn from '@components/Authentication/SignIn'

const AppPage = () => (
  <Layout>
    <SEO />
    <Router basepath="/app">
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <SignIn path="/signin" />
      <SignUp path="/signup" />
    </Router>
  </Layout>
)

export default AppPage
