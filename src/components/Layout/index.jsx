import React from 'react'
import PropTypes from 'prop-types'

import Navigation from '@components/Navigation'
import GlobalStyles from '@style/GlobalStyles'
import styled, { ThemeProvider, theme, themeGet } from '@style'

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 ${themeGet('space.3')};
`

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <Navigation />
      <Container>{children}</Container>
    </>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Layout }
