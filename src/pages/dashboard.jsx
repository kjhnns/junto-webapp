import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router'
import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { Dashboard } from '@components/Dashboard'
import { CreateNewHabit } from '@components/CreateNewHabit'
import { EditHabit } from '@components/EditHabit'
import { HabitDetails } from '@components/HabitDetails'
import { PrivateRoute } from '@components/PrivateRoute'

const DashboardPage = () => (
  <Layout>
    <SEO />
    <Router>
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/dashboard/new" component={CreateNewHabit} />
      <PrivateRoute path="/dashboard/edit/:habitId" component={EditHabit} />
      <PrivateRoute
        path="/dashboard/details/:habitId"
        component={HabitDetails}
      />
    </Router>
  </Layout>
)

export default DashboardPage
