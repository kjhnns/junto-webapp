import React from 'react'

import { Link } from '@components/Link'
import { Layout } from '@components/Layout'
import { Box } from '@components/Grid'
import { SEO } from '@components/SEO'
import { Text } from '@components/Typography'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 — Not found" />
    <Box
      sx={{
        minHeight: '100vh',
        bg: 'gray.100',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ fontSize: 4 }}>
        <Text mb={3}>You just hit a route that doesn&#39;t exist...</Text>
        <Link to="/">Take me home.</Link>
      </Box>
    </Box>
  </Layout>
)

export default NotFoundPage
