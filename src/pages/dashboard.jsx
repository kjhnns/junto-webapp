import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router'
import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { Dashboard } from '@components/Dashboard'
import { PrivateRoute } from '@components/PrivateRoute'
import { MenuBar } from '@components/Navigation'

const DashboardPage = () => (
  <Layout>
    <SEO />
    <MenuBar />
    <Router>
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </Router>
  </Layout>
)

export default DashboardPage
