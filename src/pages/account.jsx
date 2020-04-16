import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router'
import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { Link } from 'gatsby'

const PageOne = () => <p>Hello from page one</p>
const PageTwo = () => <p>Holaaaa from page two</p>

const Account = () => (
  <Layout>
    <SEO />
    <>
      <nav>
        <Link to="/account/">Home</Link>{' '}
        <Link to="/account/one/">Page One</Link>{' '}
        <Link to="/account/two/">Page Two</Link>{' '}
      </nav>
      <Router>
        {/* <Home path="/account/" user={user} /> */}
        <PageOne path="/account/one" />
        <PageTwo path="/account/two" />
      </Router>
    </>
  </Layout>
)

export default Account
