import React from 'react'
import PropTypes from 'prop-types'
import { AnimateSharedLayout } from 'framer-motion'

import { Link } from '@components/Link'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import { Container } from '@components/Container'

import Card from './Card'

const HabitList = ({
  selectedTimestamp,
  habits,
  handleUnCheckClick,
  handleCheckClick,
}) => {
  const sortedHabits = habits.sort((a, b) => b.streakDays - a.streakDays)

  if (!habits.length) {
    return (
      <Flex flexDirection="column" alignItems="center" my={[2, 3]}>
        <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
          This looks empty. Let&apos;s fix this! Start your habit journey now.
        </Text>
        <Flex flexDirection="column" alignItems="center" my={3}>
          <Link sx={{ fontWeight: 600, fontSize: 4 }} to="/dashboard/new">
            Add habit
          </Link>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex flexDirection="column" alignItems="center">
      <Container>
        <Flex flexDirection="column" my={[2, 3]}>
          <AnimateSharedLayout>
            {sortedHabits.map(
              ({
                id,
                title,
                checked,
                streak,
                streakDays,
                streakFrozen,
                streakIncToday,
              }) => {
                return (
                  <Box key={id} width="100%" my={[2, 3]} px={[2, 3, 4, 0]}>
                    <Card
                      title={title}
                      linkTo={`/dashboard/details/${id}`}
                      checked={checked > 0}
                      streakDays={streakDays}
                      streakIncToday={streakIncToday}
                      streakFrozen={streakFrozen}
                      streak={streak}
                      handleClick={() => {
                        if (checked > 0) {
                          handleUnCheckClick(id, checked)
                        } else {
                          handleCheckClick(id, selectedTimestamp)
                        }
                      }}
                    />
                  </Box>
                )
              }
            )}
          </AnimateSharedLayout>
          <Flex flexDirection="column" alignItems="center" my={3}>
            <Link sx={{ fontWeight: 600, fontSize: 4 }} to="/dashboard/new">
              Add habit
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  )
}

HabitList.defaultProps = {
  habits: [],
}

HabitList.propTypes = {
  selectedTimestamp: PropTypes.number.isRequired,
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      checked: PropTypes.number,
    })
  ),
  handleCheckClick: PropTypes.func.isRequired,
  handleUnCheckClick: PropTypes.func.isRequired,
}

export { HabitList }
