import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Text } from '@components/Typography'
import { Flex, Box } from '@components/Grid'

const streakCounter = (curr, checks) => {
  if (checks.length > 0 && curr.isSame(checks[0], 'day')) {
    checks.shift()
    return 1 + streakCounter(curr.subtract(1, 'days'), checks)
  }
  return 0
}

const Streak = ({ habit }) => {
  const checkedTimeStamps = habit.checked
  const yesterday = moment().subtract(1, 'days')
  const today = moment()

  if (checkedTimeStamps === null || checkedTimeStamps.length === 0) {
    return ''
  }

  const sortedTsps = checkedTimeStamps.sort((a, b) => b - a)
  const checkedObjs = sortedTsps.map(moment.unix)
  const streakIncToday = streakCounter(today, checkedObjs)
  const streakExcToday = streakCounter(yesterday, checkedObjs)

  const isThereAStreak = streakIncToday > 1 || streakExcToday > 1
  const isTodayIncluded = streakIncToday > streakExcToday
  const streak = isTodayIncluded ? streakIncToday : streakExcToday

  return (
    <Box>
      <Text as="h2" px={[3, 0]} py={3}>
        Streak
      </Text>
      <Flex
        flexDirection="row"
        sx={{
          bg: 'white',
          flex: 1,
          borderRadius: [0, 'default'],
          py: 1,
          px: [3, 4, 4],
          justifyContent: 'space-between',
        }}
      >
        {isThereAStreak ? (
          <Flex flexDirection="column" py={2}>
            <Text
              sx={{
                textAlign: 'center',
                fontSize: 3,
                py: 2,
                color: isTodayIncluded ? 'gray.800' : 'gray.500',
              }}
            >
              {streak}
            </Text>
            <Text
              sx={{
                textAlign: 'center',
                fontSize: [1, 2, 2],
                color: isTodayIncluded ? 'gray.800' : 'gray.500',
              }}
            >
              Days
            </Text>
          </Flex>
        ) : (
          <Text py={3}>Build a streak to motivate yourself!</Text>
        )}
      </Flex>
    </Box>
  )
}

Streak.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  habit: PropTypes.object.isRequired,
}
export { Streak }
