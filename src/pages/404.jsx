import React from 'react'

import { Link } from '@components/Link'
import { Box } from '@components/Grid'
import { SEO } from '@components/SEO'
import { Text } from '@components/Typography'

const NotFoundPage = () => (
  <>
    <SEO title="404 — Not found" />
    <Box sx={{ fontSize: 4, textAlign: 'center' }}>
      <Text mb={3} mt={5}>
        You just hit a route that doesn&#39;t exist...
      </Text>
      <Link to="/">Take me home.</Link>
    </Box>
  </>
)

export default NotFoundPage
