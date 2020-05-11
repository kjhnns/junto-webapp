import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import { GridStatistic } from './GridStatistic'

const Statistics = ({ habitChecks }) => {
  const momentHabitChecks = habitChecks.map(check => moment.unix(check))
  const today = moment()

  const thisYear = momentHabitChecks
    .map(check => (check.isSame(today, 'year') ? 1 : 0))
    .reduce((pv, cv) => pv + cv)
  const thisWeekISO = momentHabitChecks
    .map(check => (check.isSame(today, 'isoWeek') ? 1 : 0))
    .reduce((pv, cv) => pv + cv)
  const thisMonth = momentHabitChecks
    .map(check => (check.isSame(today, 'month') ? 1 : 0))
    .reduce((pv, cv) => pv + cv)

  const lastYear = momentHabitChecks
    .map(check =>
      check.isSame(today.clone().subtract(1, 'year'), 'year') ? 1 : 0
    )
    .reduce((pv, cv) => pv + cv)
  const lastWeekISO = momentHabitChecks
    .map(check =>
      check.isSame(today.clone().subtract(1, 'week'), 'isoWeek') ? 1 : 0
    )
    .reduce((pv, cv) => pv + cv)
  const lastMonth = momentHabitChecks
    .map(check =>
      check.isSame(today.clone().subtract(1, 'month'), 'month') ? 1 : 0
    )
    .reduce((pv, cv) => pv + cv)

  return (
    <Flex flexDirection="column">
      <GridStatistic habitChecks={habitChecks} />
      <Box>
        <Text as="h2" py={3}>
          Comparison
        </Text>
        <Flex flexDirection="column" sx={{ bg: 'gray.300', py: 3, px: 4 }}>
          <Flex flexDirection="column" py={2}>
            <Text>{`Total Checks ${momentHabitChecks.length}`}</Text>
          </Flex>
          <Flex flexDirection="column" py={2}>
            <Text>{`This week* ${thisWeekISO}`}</Text>
            <Text>{`Last week* ${lastWeekISO}`}</Text>
          </Flex>
          <Flex flexDirection="column" py={2}>
            <Text>{`This month ${thisMonth}`}</Text>
            <Text>{`Last month ${lastMonth}`}</Text>
          </Flex>
          <Flex flexDirection="column" py={2}>
            <Text>{`This year ${thisYear}`}</Text>
            <Text>{`Last year ${lastYear}`}</Text>
          </Flex>
          <Text sx={{ fontSize: 1, fontStyle: 'italic', py: 2 }}>
            * Week starts on Monday
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

Statistics.propTypes = {
  habitChecks: PropTypes.arrayOf(PropTypes.number).isRequired,
}
export { Statistics }
