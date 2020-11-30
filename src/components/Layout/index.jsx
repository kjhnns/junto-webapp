import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'theme-ui'
import { FeedbackFish } from '@feedback-fish/react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Global, css } from '@emotion/core'

import { Button } from '@components/Button'
import { Box } from '@components/Grid'

import theme from '../../gatsby-plugin-theme-ui'
import 'typeface-inter'

// const FeedbackButton = () => (
//   <B
// )

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Global
      styles={css`
        body {
          padding: 0;
        }

        @media (max-width: ${theme.breakpoints[0]}) {
          body {
            padding-bottom: 70px;
          }
        }
      `}
    />
    <>{children}</>
    <FeedbackFish projectId="ecbda4963f3b1f">
      <Box sx={{ position: `absolute`, bottom: [`72px`, 3], right: [3] }}>
        <Button>Give us feedback</Button>
      </Box>
    </FeedbackFish>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Layout }
