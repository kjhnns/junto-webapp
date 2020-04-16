import React from 'react'

import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { Flex } from '@components/Grid'
import { Heading, Text } from '@components/Typography'
import { LoginAndSignupBanner } from '@components/LoginAndSignupBanner'

const IndexPage = () => (
  <Layout>
    <SEO />
    <Flex flexDirection="column" alignItems="center">
      <Heading as="h1" textAlign="center" fontSize={7}>
        junto
      </Heading>
      <Text textAlign="center" fontSize="24px">
        social habit tracking
      </Text>
      <Text fontStyle="italic" maxWidth="400px" mt={4} textAlign="justify">
        Good resolutions don’t work - social mechanisms do. Junto levarages
        behavioral science to help users achieve their personal goals by
        building good habits and breaking bad habits - together.
      </Text>
    </Flex>
    <LoginAndSignupBanner />
  </Layout>
)

export default IndexPage
