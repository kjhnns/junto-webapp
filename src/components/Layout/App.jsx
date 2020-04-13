import React from 'react'
import PropTypes from 'prop-types'

import { Link } from '@reach/router'
import { Flex, Box } from '@components/Grid'
import GlobalStyles from '@style/GlobalStyles'
import { ThemeProvider, theme } from '@style'

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <Flex
        maxWidth="1280px"
        flexDirection="row"
        m="0 auto"
        px={3}
        justifyContent="center"
        my={4}
      >
        <Flex
          minWidth="150px"
          flexDirection="column"
          borderRight="1px solid #000"
        >
          <Box m={2}>
            <Link to="/app">Home</Link>
          </Box>
          <Box m={2}>
            <Link to="/app/signin">Sign In</Link>
          </Box>
          <Box m={2}>
            <Link to="/app/signup">Sign Up</Link>
          </Box>
        </Flex>
        <Flex mx={4} flexDirection="column" flex="1">
          {children}
        </Flex>
      </Flex>
    </>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Layout }
