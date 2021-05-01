/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'theme-ui'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Global, css } from '@emotion/core'

import theme from '../../gatsby-plugin-theme-ui'
import 'typeface-inter'

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Global
      styles={css`
        body {
          padding: 0;
        }

        @media (max-width: ${theme.breakpoints[0]}) {
          body {
            padding-bottom: max(calc(env(safe-area-inset-bottom) + 70px), 70px);
          }
        }
      `}
    />
    <>{children}</>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Layout }
