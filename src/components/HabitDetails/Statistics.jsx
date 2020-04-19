import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Flex } from '@components/Grid'
import { Text } from '@components/Typography'

const Statistics = ({ habitChecks }) => {
  const momentHabitChecks = habitChecks.map(check => moment.unix(check))
  const today = moment()

  const thisYear = momentHabitChecks
    .map(check => check.isSame(today, 'year'))
    .reduce((pv, cv) => pv + cv)
  const thisWeekISO = momentHabitChecks
    .map(check => check.isSame(today, 'isoWeek'))
    .reduce((pv, cv) => pv + cv)
  const thisMonth = momentHabitChecks
    .map(check => check.isSame(today, 'month'))
    .reduce((pv, cv) => pv + cv)

  return (
    <Flex flexDirection="column">
      <Text>{`This week ${thisWeekISO}`} (Monday) </Text>
      <Text>{`This month ${thisMonth}`}</Text>
      <Text>{`This year ${thisYear}`}</Text>
    </Flex>
  )
}

Statistics.propTypes = {
  habitChecks: PropTypes.arrayOf(PropTypes.number).isRequired,
}
export { Statistics }
