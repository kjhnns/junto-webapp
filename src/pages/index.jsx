import React from 'react'

import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { Box } from '@components/Grid'
import { Heading, Text } from '@components/Typography'
import { LoginAndSignupBanner } from '@components/LoginAndSignupBanner'

const IndexPage = () => (
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
          social habit tracking
        </Text>
        <Text fontSize={3} lineHeight="1.4">
          Good resolutions don’t work — social mechanisms do. Junto levarages
          behavioral science to help users achieve their personal goals by
          building good habits and breaking bad habits —{' '}
          <Text display="inline" fontWeight="bold">
            together.
          </Text>
        </Text>
      </Box>
    </Box>
    <LoginAndSignupBanner />
  </Layout>
)

export default IndexPage
