import React from 'react'
import PropTypes from 'prop-types'

import { Flex } from '@components/Grid'
import { Overall } from './Overall'
import { Grid } from './Grid'

const Statistics = ({ habitChecks }) => (
  <Flex flexDirection="column">
    <Overall habitChecks={habitChecks} />
    <Grid habitChecks={habitChecks} />
  </Flex>
)

Statistics.propTypes = {
  habitChecks: PropTypes.arrayOf(PropTypes.number).isRequired,
}
export { Statistics }