import React from 'react'

import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { Text } from '@components/Text'
import SignUp from '../components/Authentication/SignUp'
import SignIn from '../components/Authentication/SignIn'

const IndexPage = () => (
  <Layout>
    <SEO />
    <Text as="h2" mb={3}>
      <SignUp />

      <SignIn />
    </Text>
  </Layout>
)

export default IndexPage
