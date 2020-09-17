import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { Box } from '@components/Grid'
import { Heading, Text } from '@components/Typography'
import { LoginAndSignupBanner } from '@components/LoginAndSignupBanner'
import { isLoggedIn } from '@auth'

const IndexPage = () => {
  useEffect(() => {
    async function loggedInRedirect() {
      if (await isLoggedIn()) {
        navigate('/dashboard', { replace: true })
      }
    }
    loggedInRedirect()
  })

  return (
    <Layout>
      <SEO />
      <Box
        sx={{
          p: 4,
          pb: '84px',
          minHeight: '100vh',
          bg: 'gray.100',
          display: 'grid',
          alignItems: 'center',
        }}
      >
        <Box maxWidth="500px">
          <Heading as="h1" fontSize={8}>
            junto
          </Heading>
          <Text mb={3} fontSize={4} color="gray.600">
            simple habit tracking
          </Text>
          <Text fontSize={3} lineHeight="1.4">
            Good resolutions don’t work — habits do. Junto is a simple habit
            tracking app that helps users to follow through on their goals.
          </Text>
        </Box>
      </Box>
      <LoginAndSignupBanner />
    </Layout>
  )
}

export default IndexPage
