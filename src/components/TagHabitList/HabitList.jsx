import React from 'react'

import { Tag as TagManager } from '@api'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import { Button } from '@components/Button'

import { Link } from '@components/Link'

import HabitCard from './HabitCard'

const HabitList = ({ habits, tag, setTag }) => {
  if (!habits.length) {
    return (
      <Flex flexDirection="column" alignItems="center" my={[2, 3]}>
        <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
          Before you can add habits you need to create some!
        </Text>
        <Flex flexDirection="column" alignItems="center" my={3}>
          <Link sx={{ fontWeight: 600, fontSize: 4 }} to="/dashboard/new">
            Add habit
          </Link>
        </Flex>
      </Flex>
    )
  }

  const tagId = tag.id

  return (
    <Box>
      <Box>
        {habits.map(habit => {
          const active =
            tag.actions && tag.actions.filter(a => a.id === habit.id).length > 0
          return (
            <HabitCard
              key={habit.id}
              onClickHandler={async () => {
                if (active) {
                  if (await TagManager.remove({ habitId: habit.id, tagId })) {
                    const updatedHabits = tag.actions.filter(
                      h => h.id !== habit.id
                    )
                    setTag({ ...tag, actions: updatedHabits })
                  }
                } else {
                  await TagManager.append({ tagId, habitId: habit.id })
                  if (tag.actions !== null) {
                    const updatedHabits = [
                      { id: habit.id, title: habit.title },
                      ...tag.actions,
                    ]
                    setTag({ ...tag, actions: updatedHabits })
                  } else {
                    const updatedHabits = [{ id: habit.id, title: habit.title }]
                    setTag({ ...tag, actions: updatedHabits })
                  }
                }
              }}
              habit={habit}
              active={active}
            />
          )
        })}
      </Box>
      <Flex flexDirection="column" alignItems="center" my={3}>
        <Button variant="clear" as={Link} to={`/dashboard/tags`}>
          close
        </Button>
      </Flex>
    </Box>
  )
}

export default HabitList
