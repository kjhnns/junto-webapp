import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router'
import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { Dashboard } from '@components/Dashboard'
import { CreateNewHabit } from '@components/CreateNewHabit'
import { PrivateRoute } from '@components/PrivateRoute'

const DashboardPage = () => (
  <Layout>
    <SEO />
    <Router>
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/dashboard/new" component={CreateNewHabit} />
    </Router>
  </Layout>
)

export default DashboardPage
