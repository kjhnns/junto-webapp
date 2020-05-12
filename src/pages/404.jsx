import React from 'react'

import { Link } from '@components/Link'
import { SEO } from '@components/SEO'
import { Text } from '@components/Typography'

// ISSUE!
// Somehow when reach router is not loaded and 404 is thrown (refreshing on habit/details page)
// the 404 Page's style and layout overrides the pages that are then load by reach router

const NotFoundPage = () => (
  <>
    <SEO title="404 — Not found" />
    <>
      <Text ml={5} mt={5}>
        You just hit a route that doesn&#39;t exist...
      </Text>
      <Link ml={5} to="/">
        Take me home.
      </Link>
    </>
  </>
)

export default NotFoundPage
