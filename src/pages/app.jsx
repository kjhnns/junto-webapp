import React from 'react'

import { Router, Link } from '@reach/router'
import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { Text } from '@components/Text'
import SignUp from '../components/Authentication/SignUp'
import SignIn from '../components/Authentication/SignIn'

const Home = () => (
  <div>
    <h1>Home</h1>
    <nav>
      <Link to="/app">Home</Link> | <Link to="signin">Sign In</Link> |{' '}
      <Link to="signup">Sign Up</Link>
    </nav>
  </div>
)

const AppPage = () => (
  <Layout>
    <SEO />
    <Router basepath="/app">
      <SignIn path="/signin" />
      <SignUp path="/signup" />
      <Home path="/" />
    </Router>
  </Layout>
)

export default AppPage
