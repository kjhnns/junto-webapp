import React from 'react'

import { Layout } from '@components/Layout'
import { MenuBar } from '@components/Navigation'
import { SEO } from '@components/SEO'
import { Heading } from '@components/Typography'
import { Box, Flex } from '@components/Grid'
import { AppLink } from '@components/Link'
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
      <Flex flexDirection="column" flex="1" maxWidth="800px">
        <Heading my={3}>Account Settings</Heading>
        <Box my={3}>
          <AppLink sx={{ textDecoration: 'none' }} to="/settings/password">
            <Box
              sx={{
                boxShadow: 'inset 0 0 0 2px',
                p: 4,
                fontSize: 3,
                borderRadius: 3,
                fontWeight: 600,
              }}
            >
              Change Password
            </Box>
          </AppLink>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button onClick={signOut} variant="clear">
            Log out
          </Button>
        </Box>
      </Flex>
    </Flex>
  </Layout>
)

export { Settings }
