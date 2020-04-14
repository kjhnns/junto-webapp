import React from 'react'
import PropTypes from 'prop-types'

import LargeNavigation from '@components/Navigation/LargeNavigation'
import SmallNavigation from '@components/Navigation/SmallNavigation'
import { Box } from '@components/Grid'
import GlobalStyles from '@style/GlobalStyles'
import { ThemeProvider, theme } from '@style'

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <LargeNavigation />
      <Box maxWidth="700px" m="0 auto" px={3}>
        {children}
      </Box>
      <SmallNavigation />
    </>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Layout }
