import React from 'react'

import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { Heading } from '@components/Typography'
import { Box, Flex } from '@components/Grid'
import { AppLink } from '@components/Link'
import { Button } from '@components/Button'

import { signOut } from '@auth'

const menuItem = {
  boxShadow: ['none', null, 'inset 0 0 0 4px'],
  p: 4,
  bg: 'gray.200',
  fontSize: 3,
  borderBottom: ['4px #000 solid', null, 'none'],
  borderRadius: [0, 0, 3],
  fontWeight: 600,
}

const Settings = () => (
  <Layout>
    <SEO title="Dashboard" />
    <Box
      sx={{
        display: 'grid',
        minHeight: '100vh',
        bg: 'gray.100',
        gridTemplateAreas: [
          "'main''close'",
          null,
          "'close ... ...' '... main ...' '... ... ...'",
        ],
        gridTemplateColumns: ['1fr', null, '.5fr 1fr .5fr'],
        gridTemplateRows: ['1fr 0.25fr', null, '.25fr 1fr'],
      }}
    >
      <Flex
        sx={{
          p: [3, 4],
          gridArea: 'close',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button as={AppLink} to="/dashboard" variant="secondary">
          close
        </Button>
      </Flex>
      <Flex
        sx={{
          gridArea: 'main',
          justifyContent: 'center',
        }}
      >
        <Flex flexDirection="column" flex="1" maxWidth="800px">
          <Heading as="h1" textAlign="center" m={4}>
            Account Settings
          </Heading>
          <Box my={[0, 0, 3]}>
            <AppLink sx={{ textDecoration: 'none' }} to="/settings/username">
              <Box sx={menuItem}>Display Name</Box>
            </AppLink>
          </Box>
          <Box my={[0, 0, 3]}>
            <AppLink sx={{ textDecoration: 'none' }} to="/settings/email">
              <Box sx={menuItem}>Email Address</Box>
            </AppLink>
          </Box>
          <Box my={[0, 0, 3]}>
            <AppLink sx={{ textDecoration: 'none' }} to="/settings/password">
              <Box sx={menuItem}>Password</Box>
            </AppLink>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button onClick={signOut} variant="outline">
              Log out
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  </Layout>
)

export { Settings }

export { EmailSettings } from './Email'
export { PasswordSettings } from './Password'
export { DisplayNameSettings } from './DisplayName'
