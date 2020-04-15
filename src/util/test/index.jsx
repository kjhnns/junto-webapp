/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import PropTypes from 'prop-types'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router'
import { ThemeProvider, theme } from '@style'

const ThemeWrapper = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

ThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

const customRender = (ui, options) =>
  render(ui, { wrapper: ThemeWrapper, ...options })

/*
 * this is a handy function that I would utilize for any component
 * that relies on the router being in context
 */
function renderWithRouter(
  ui,
  { route = '/', history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render, renderWithRouter, userEvent }
