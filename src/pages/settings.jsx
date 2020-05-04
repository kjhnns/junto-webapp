import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router'
import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import {
  Settings,
  PasswordSettings,
  EmailSettings,
  DisplayNameSettings,
} from '@components/Settings'
import { PrivateRoute } from '@components/PrivateRoute'

const SettingsPage = () => (
  <Layout>
    <SEO />
    <Router>
      <PrivateRoute path="/settings" component={Settings} />
      <PrivateRoute path="/settings/username" component={DisplayNameSettings} />
      <PrivateRoute path="/settings/password" component={PasswordSettings} />
      <PrivateRoute path="/settings/email" component={EmailSettings} />
    </Router>
  </Layout>
)

export default SettingsPage
