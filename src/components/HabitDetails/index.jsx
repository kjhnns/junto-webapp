import React, { useState, useEffect } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'

import { Habit } from '@api'
import { Layout } from '@components/Layout'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Heading, Text } from '@components/Typography'
import { Box, Flex } from '@components/Grid'
import { MenuBar } from '@components/Navigation'

import { Statistics } from './Statistics'
import { DeleteDialog } from './DeleteDialog'

const HabitDetails = ({ habitId }) => {
  const [loadingState, setLoadingState] = useState('LOADING')
  const [habit, setHabit] = useState({})

  useEffect(() => {
    async function fetchData() {
      const result = await Habit.getOne(habitId)
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
      <Layout>
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
      </Layout>
    )
  }

  if (loadingState === 'ERROR') {
    return (
      <Layout>
        <Flex width="100%" flexDirection="column">
          <MenuBar />
          <Flex flexDirection="column">
            <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
              Oops... Something went wrong.
            </Text>
            <Flex justifyContent="center">
              <Button
                variant="clear"
                onClick={() => setLoadingState('LOADING')}
              >
                Retry
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Layout>
    )
  }

  return (
    <Layout>
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
            <Flex my={3}>
              <Box mr={2}>
                <Button
                  onClick={async () => {
                    await navigate(`/dashboard/edit/${habitId}`)
                  }}
                  variant="outline"
                >
                  Edit
                </Button>
              </Box>
              <DeleteDialog
                deleteHandler={async () => {
                  const result = await Habit.remove(habitId)
                  if (result) {
                    await navigate('/dashboard')
                  }
                }}
              />
            </Flex>
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
