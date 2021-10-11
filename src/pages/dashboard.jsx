import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router'
import { SEO } from '@components/SEO'
import { Dashboard } from '@components/Dashboard'
import { CreateNewHabit } from '@components/CreateNewHabit'
import { CreateNewTag } from '@components/CreateNewTag'
import { TagHabitList } from '@components/TagHabitList'
import { TagList } from '@components/TagList'
import { EditHabit } from '@components/EditHabit'
import { EditTag } from '@components/EditTag'
import { HabitDetails } from '@components/HabitDetails'
import { PrivateRoute } from '@components/PrivateRoute'

const DashboardPage = () => (
  <>
    <SEO />
    <Router>
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/dashboard/new" component={CreateNewHabit} />
      <PrivateRoute path="/dashboard/edit/:habitId" component={EditHabit} />
      <PrivateRoute path="/dashboard/tags" component={TagList} />
      <PrivateRoute path="/dashboard/tags/new" component={CreateNewTag} />
      <PrivateRoute path="/dashboard/tags/:tagId" component={TagHabitList} />
      <PrivateRoute path="/dashboard/tags/edit/:tagId" component={EditTag} />
      <PrivateRoute
        path="/dashboard/details/:habitId"
        component={HabitDetails}
      />
    </Router>
  </>
)

export default DashboardPage
