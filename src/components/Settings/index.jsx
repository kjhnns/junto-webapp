import React from 'react'

import { Layout } from '@components/Layout'
import { MenuBar } from '@components/Navigation'
import { SEO } from '@components/SEO'
import { Heading } from '@components/Typography'
import { Box, Flex } from '@components/Grid'
import { AppLink } from '@components/Link'
import { FeedbackFish } from '@feedback-fish/react'
import { Button } from '@components/Button'

import { signOut } from '@auth'

const menuItem = {
  boxShadow: ['none', 'inset 0 0 0 4px', null, null],
  p: 4,
  display: 'block',
  bg: 'gray.300',
  textDecoration: 'none',
  fontSize: 3,
  borderBottom: ['4px #000 solid', 'none', null, null],
  borderRadius: [0, 3, null, null],
  fontWeight: 600,
  my: [0, 3, null, null],
}

const Settings = () => (
  <Layout>
    <SEO title="Settings" />
    <MenuBar active="settings" />
    <Flex
      flexDirection="column"
      alignItems="center"
      sx={{
        minHeight: '100vh',
        bg: 'gray.100',
      }}
    >
      <Flex
        flexDirection="column"
        flex="1"
        px={[0, 3, null, null]}
        width="100%"
        maxWidth="800px"
      >
        <Heading as="h1" textAlign="center" m={4}>
          Account Settings
        </Heading>
        <Box
          as={AppLink}
          to="/settings/username"
          sx={{
            ...menuItem,
            borderTop: ['4px #000 solid', 'none', null, null],
          }}
        >
          Display Name
        </Box>
        <Box as={AppLink} to="/settings/email" sx={menuItem}>
          Email Address
        </Box>
        <Box as={AppLink} to="/settings/password" sx={menuItem}>
          Password
        </Box>
        <Box onClick={signOut} sx={menuItem}>
          Log out
        </Box>
        <Flex flexDirection="column" alignItems="center" sx={{ my: 3, p: 4 }}>
          <FeedbackFish projectId="ecbda4963f3b1f">
            <Button>Give us feedback</Button>
          </FeedbackFish>
        </Flex>
      </Flex>
    </Flex>
  </Layout>
)

export { Settings }

export { EmailSettings } from './Email'
export { PasswordSettings } from './Password'
export { DisplayNameSettings } from './DisplayName'
