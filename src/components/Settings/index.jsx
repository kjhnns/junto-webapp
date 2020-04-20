import React from 'react'

import { Layout } from '@components/Layout'
import { MenuBar } from '@components/Navigation'
import { SEO } from '@components/SEO'
import { Heading } from '@components/Typography'
import { Box, Flex } from '@components/Grid'
import { Link } from '@components/Link'
import { Button } from '@components/Button'

import { signOut } from '@auth'

const Settings = () => (
  <Layout>
    <SEO title="Dashboard" />
    <MenuBar />
    <Flex
      sx={{
        p: [3, 4],
        minHeight: '100vh',
        bg: 'gray.100',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Flex flexDirection="column">
        <Heading my={3}>Settings and Preferences</Heading>
        <Box m={3}>
          <Link>Display Name</Link>
        </Box>
        <Box m={3}>
          <Link>Email address</Link>
        </Box>
        <Box m={3}>
          <Link>Password</Link>
        </Box>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button as={Link} onClick={signOut} variant="outline">
            Log out
          </Button>
        </Box>
      </Flex>
    </Flex>
  </Layout>
)

export { Settings }
