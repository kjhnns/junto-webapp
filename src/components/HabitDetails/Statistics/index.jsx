import React from 'react'
import PropTypes from 'prop-types'

import { Flex } from '@components/Grid'
import { Overall } from './Overall'
import { Grid } from './Grid'
import { Streak } from './Streak'

const Statistics = ({ habit }) => (
  <Flex flexDirection="column">
    <Overall habitChecks={habit.checked} />
    <Streak habit={habit} />
    <Grid habit={habit} />
  </Flex>
)

Statistics.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  habit: PropTypes.object.isRequired,
}
export { Statistics }
