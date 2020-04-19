import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import PropTypes from 'prop-types'

import { Text } from '@components/Typography'
import { Box, Flex } from '@components/Grid'
import { Link } from '@components/Link'

import { Header } from './Header'
import { HeaderLoading } from './HeaderLoading'

const loadHabit = async habitId => {
  try {
    const sessionCookie = window.localStorage.getItem('sessionCookie')
    const habit = await axios.get(
      `${process.env.GATSBY_API_URL}/action/${habitId}`,
      {
        headers: {
          Bearer: sessionCookie,
        },
      }
    )
    if (habit.status !== 200 && habit.data.status === 'success') {
      return { success: false }
    }
    return { success: true, data: habit.data.data }
  } catch (error) {
    return { success: false }
  }
}

const HabitDetails = ({ habitId }) => {
  const [loadingState, setLoadingState] = useState('LOADING')
  const [habit, setHabit] = useState({})

  useEffect(() => {
    async function fetchData() {
      const result = await loadHabit(habitId)
      if (result.success === false) {
        setLoadingState('ERROR')
        return null
      }
      setLoadingState('SUCCESSFUL')
      setHabit(result.data)
      return true
    }

    fetchData()
  }, [habitId])

  if (loadingState === 'LOADING') {
    return (
      <Flex width="100%" flexDirection="column">
        <HeaderLoading />
        <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
          Loading ...
        </Text>
      </Flex>
    )
  }

  if (loadingState === 'ERROR') {
    return (
      <Flex width="100%" flexDirection="column">
        <HeaderLoading />
        <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
          Oops. Something went wrong...
        </Text>
      </Flex>
    )
  }

  return (
    <Flex width="100%" flexDirection="column">
      <Header title={`${habit.title}`} />
      <Box>
        <Text>
          Created on {`${moment.unix(habit.created_at).format('YYYY-MM-DD')}`}
        </Text>

        <Box my={3}>
          <Link sx={{ fontWeight: 600, fontSize: 4 }} to="/dashboard">
            Delete this habit
          </Link>
        </Box>
      </Box>
    </Flex>
  )
}

HabitDetails.propTypes = {
  habitId: PropTypes.string.isRequired,
}

export { HabitDetails }
