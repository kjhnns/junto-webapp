import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'

const Overall = ({ habitChecks }) => {
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

  return (
    <Box>
      <Text as="h2" px={[3, 0]} py={3}>
        Overall
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
        <Flex flexDirection="column" py={2}>
          <Text
            sx={{ textAlign: 'center', fontSize: 3, py: 2 }}
          >{`${momentHabitChecks.length}`}</Text>
          <Text sx={{ textAlign: 'center', fontSize: [1, 2, 2] }}>
            All Time
          </Text>
        </Flex>
        <Flex flexDirection="column" py={2}>
          <Text
            sx={{ textAlign: 'center', fontSize: 3, py: 2 }}
          >{`${thisWeekISO}`}</Text>
          <Text sx={{ textAlign: 'center', fontSize: [1, 2, 2] }}>
            This Week
          </Text>
        </Flex>
        <Flex flexDirection="column" py={2}>
          <Text
            sx={{ textAlign: 'center', fontSize: 3, py: 2 }}
          >{`${thisMonth}`}</Text>
          <Text sx={{ textAlign: 'center', fontSize: [1, 2, 2] }}>
            This Month
          </Text>
        </Flex>
        <Flex flexDirection="column" py={2}>
          <Text
            sx={{ textAlign: 'center', fontSize: 3, py: 2 }}
          >{`${thisYear}`}</Text>
          <Text sx={{ textAlign: 'center', fontSize: [1, 2, 2] }}>
            This Year
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

Overall.propTypes = {
  habitChecks: PropTypes.arrayOf(PropTypes.number).isRequired,
}
export { Overall }
