import React from 'react'

import { Layout } from '@components/Layout/Website'
import { SEO } from '@components/SEO'
import Home from '@components/Home'

const IndexPage = () => (
  <Layout>
    <SEO />
    <Home />
  </Layout>
)

export default IndexPage
