import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'theme-ui'

import GlobalStyles from '../../util/style/GlobalStyles'
import theme from '../../gatsby-plugin-theme-ui'
import 'typeface-inter'

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      {children}
    </>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Layout }
