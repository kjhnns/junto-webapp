import React, { useState, useEffect } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'

import { axios } from '@api'
import { getIdToken } from '@auth'
import { SEO } from '@components/SEO'
import { Heading, Text } from '@components/Typography'
import { Box, Flex } from '@components/Grid'
import { MenuBar } from '@components/Navigation'

import { Statistics } from './Statistics'
import { DeleteDialog } from './DeleteDialog'

const deleteHabit = async habitId => {
  try {
    const idToken = await getIdToken()
    const habit = await axios.delete(
      `${process.env.GATSBY_API_URL}/action/${habitId}`,
      {
        headers: {
          Bearer: idToken,
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

const loadHabit = async habitId => {
  try {
    const idToken = await getIdToken()
    const habit = await axios.get(
      `${process.env.GATSBY_API_URL}/action/${habitId}`,
      {
        headers: {
          Bearer: idToken,
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
      <>
        <Flex
          sx={{
            minHeight: '100vh',
            bg: 'gray.100',
            flexDirection: 'column',
          }}
        >
          <MenuBar />
          <Flex
            sx={{
              p: [3, 4],
              flex: '1',
              minHeight: '100%',
              bg: 'gray.100',
              flexDirection: 'column',
            }}
          >
            <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
              Loading ...
            </Text>
          </Flex>
        </Flex>
      </>
    )
  }

  if (loadingState === 'ERROR') {
    return (
      <>
        <Flex width="100%" flexDirection="column">
          <MenuBar />
          <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
            Oops. Something went wrong...
          </Text>
        </Flex>
      </>
    )
  }

  return (
    <>
      <SEO title={habit.title} />
      <Flex
        sx={{
          minHeight: '100vh',
          bg: 'gray.100',
          flexDirection: 'column',
        }}
      >
        <MenuBar />
        <Flex
          sx={{
            p: [3, 4],
            flex: '1',
            bg: 'gray.200',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box maxWidth="800px" width="100%">
            <Heading
              as="h1"
              sx={{ fontSize: 5, pt: 3, textTransform: 'uppercase' }}
            >{`${habit.title}`}</Heading>
            <Text>
              Created on{' '}
              {`${moment.unix(habit.created_at).format('YYYY-MM-DD')}`}
            </Text>
            <Box>
              {habit.checked ? (
                <Statistics habitChecks={habit.checked} />
              ) : (
                <Text py={4}>No statistics available</Text>
              )}
            </Box>
            <Box my={3}>
              <DeleteDialog
                deleteHandler={async () => {
                  const result = await deleteHabit(habitId)
                  if (result) {
                    await navigate('/dashboard')
                  }
                }}
              />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

HabitDetails.propTypes = {
  habitId: PropTypes.string.isRequired,
}

export { HabitDetails }
