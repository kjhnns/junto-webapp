import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import PropTypes from 'prop-types'

import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { Heading, Text } from '@components/Typography'
import { Box, Flex } from '@components/Grid'
import { Link } from '@components/Link'

import { Statistics } from './Statistics'

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
        <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
          Loading ...
        </Text>
      </Flex>
    )
  }

  if (loadingState === 'ERROR') {
    return (
      <Flex width="100%" flexDirection="column">
        <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
          Oops. Something went wrong...
        </Text>
      </Flex>
    )
  }

  return (
    <Layout>
      <SEO title="Dashboard" />
      <Flex
        sx={{
          p: [3, 4],
          minHeight: '100vh',
          bg: 'gray.100',
          flexDirection: 'column',
        }}
      >
        <Flex sx={{ maxWidth: '800px', flexDirection: 'column', m: 'auto' }}>
          <Heading as="h1" sx={{ fontSize: 5 }}>{`${habit.title}`}</Heading>
          <Text>
            Created on {`${moment.unix(habit.created_at).format('YYYY-MM-DD')}`}
          </Text>
          <Box my={3}>
            {habit.checked ? <Statistics habitChecks={habit.checked} /> : ''}
          </Box>
          <Box my={3}>
            <Link sx={{ fontWeight: 600, fontSize: 4 }} to="/dashboard">
              Back to Dashboard
            </Link>
          </Box>
          <Box my={3}>
            <Link sx={{ fontWeight: 600, fontSize: 4 }} to="/dashboard">
              Delete this habit
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  )
}

HabitDetails.propTypes = {
  habitId: PropTypes.string.isRequired,
}

export { HabitDetails }
