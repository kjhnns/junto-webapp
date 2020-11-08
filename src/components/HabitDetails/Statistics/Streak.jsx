import React from 'react'
import PropTypes from 'prop-types'

import { Text } from '@components/Typography'
import { Flex, Box } from '@components/Grid'

const Streak = ({ habit }) => {
  const checkedTimeStamps = habit.checked
  if (checkedTimeStamps === null || checkedTimeStamps.length === 0) {
    return ''
  }

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
        {habit.streak ? (
          <Flex flexDirection="column" py={2}>
            <Text
              sx={{
                textAlign: 'center',
                fontSize: 3,
                py: 2,
                color: habit.streakIncToday ? 'gray.800' : 'gray.500',
              }}
            >
              {habit.streakDays}
            </Text>
            <Text
              sx={{
                textAlign: 'center',
                fontSize: [1, 2, 2],
                color: habit.streakIncToday ? 'gray.800' : 'gray.500',
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
