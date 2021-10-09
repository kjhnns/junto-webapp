import React from 'react'
import PropTypes from 'prop-types'

import { longestStreak, streakProcessor } from '@streak'
import { Text } from '@components/Typography'
import { Flex, Box } from '@components/Grid'

const Streak = ({ habit }) => {
  const streakData = streakProcessor(habit.checked)
  const checkedTimeStamps = habit.checked
  if (checkedTimeStamps === null || checkedTimeStamps.length === 0) {
    return ''
  }
  const longest = longestStreak(checkedTimeStamps)

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
        {streakData.streak ? (
          <Flex flexDirection="row">
            <Flex flexDirection="column" py={2} px={3} pl={0}>
              <Text
                sx={{
                  textAlign: 'center',
                  fontSize: 3,
                  py: 2,
                  color: streakData.streakIncToday ? 'gray.800' : 'gray.500',
                }}
              >
                {streakData.streakDays}
              </Text>
              <Text
                sx={{
                  textAlign: 'center',
                  fontSize: [1, 2, 2],
                  color: streakData.streakIncToday ? 'gray.800' : 'gray.500',
                }}
              >
                Current
              </Text>
            </Flex>
            <Flex flexDirection="column" py={2} px={3}>
              <Text
                sx={{
                  textAlign: 'center',
                  fontSize: 3,
                  py: 2,
                  color: 'gray.800',
                }}
              >
                {longest}
              </Text>
              <Text
                sx={{
                  textAlign: 'center',
                  fontSize: [1, 2, 2],
                  color: 'gray.800',
                }}
              >
                Record
              </Text>
            </Flex>
            <Flex flexDirection="column" py={2} px={3}>
              <Text
                sx={{
                  textAlign: 'center',
                  fontSize: 3,
                  py: 2,
                  color: 'gray.800',
                }}
              >
                {streakData.streakFreezes}
              </Text>
              <Text
                sx={{
                  textAlign: 'center',
                  fontSize: [1, 2, 2],
                  color: 'gray.800',
                }}
              >
                Freezes
              </Text>
            </Flex>
          </Flex>
        ) : (
          <Flex flexDirection="row">
            <Flex flexDirection="column" py={2} px={3} pl={0}>
              <Text
                sx={{
                  textAlign: 'center',
                  fontSize: 4,
                  py: 2,
                  color: 'gray.800',
                }}
              >
                {longest}
              </Text>
              <Text
                sx={{
                  textAlign: 'center',
                  fontSize: [1, 2, 2],
                  color: 'gray.800',
                }}
              >
                Record
              </Text>
            </Flex>
            <Text py={2} px={3}>
              This is boring without a streak.
            </Text>
          </Flex>
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
