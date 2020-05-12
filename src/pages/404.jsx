import React from 'react'

import { Link } from '@components/Link'
import { Box } from '@components/Grid'
import { SEO } from '@components/SEO'
import { Text } from '@components/Typography'

const NotFoundPage = () => (
  <>
    <SEO title="404 — Not found" />
    <Box>
      <Box
        sx={{
          p: 4,
          minHeight: '100vh',
          bg: 'gray.100',
          display: 'grid',
          alignItems: 'center',
        }}
      >
        <Box sx={{ fontSize: 4 }}>
          <Text mb={3}>
            You just hit a route that doesn&#39;t exist... the sadness.
          </Text>
          <Link to="/">Take me home.</Link>
        </Box>
      </Box>
    </Box>
  </>
)

export default NotFoundPage
