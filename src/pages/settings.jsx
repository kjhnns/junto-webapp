import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router'
import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { Settings } from '@components/Settings'
import { PasswordSettings } from '@components/Settings/Password'
import { PrivateRoute } from '@components/PrivateRoute'

const SettingsPage = () => (
  <Layout>
    <SEO />
    <Router>
      <PrivateRoute path="/settings" component={Settings} />
      <PrivateRoute path="/settings/password" component={PasswordSettings} />
    </Router>
  </Layout>
)

export default SettingsPage
