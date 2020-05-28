import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Habit as HabitManager } from '@api'
import { Flex } from '@components/Grid'
import { Text } from '@components/Typography'
import { PureEditHabit } from './PureEditHabit'

const EditHabit = ({ habitId }) => {
  const [loadingState, setLoadingState] = useState('LOADING')
  const [habit, setHabit] = useState({})

  useEffect(() => {
    async function fetchData() {
      const result = await HabitManager.getOne(habitId)
      if (result.success === false) {
        setLoadingState('ERROR')
        return null
      }
      setHabit(result.data)
      setLoadingState('SUCCESSFUL')
      return true
    }

    fetchData()
  }, [habitId])

  if (loadingState === 'LOADING') {
    return (
      <>
        <Flex
          sx={{
            minHeight: '100vh',
            bg: 'gray.100',
            flexDirection: 'column',
          }}
        >
          <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
            Loading ...
          </Text>
        </Flex>
      </>
    )
  }

  if (loadingState === 'ERROR') {
    return (
      <>
        <Flex
          sx={{
            minHeight: '100vh',
            bg: 'gray.100',
            flexDirection: 'column',
          }}
        >
          <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
            Ops... Something went wrong.
          </Text>
        </Flex>
      </>
    )
  }

  return (
    <PureEditHabit
      habitId={habitId}
      currentTitle={habit.title}
      handleSubmit={HabitManager.update}
    />
  )
}

EditHabit.propTypes = {
  habitId: PropTypes.string.isRequired,
}

export { EditHabit, PureEditHabit }
