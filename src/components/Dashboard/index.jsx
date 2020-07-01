import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'

import { Habit } from '@api'
import { SEO } from '@components/SEO'
import { Layout } from '@components/Layout'
import { MenuBar } from '@components/Navigation'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import { Button } from '@components/Button'

import { Calendar } from './Calendar'
import { HabitList } from './HabitList'
import { HabitListLoading } from './HabitListLoading'
import { useEventListener } from './EventListener'

const getTimestamp = (checkedTimeStamps, selectedDay) => {
  if (checkedTimeStamps === null || checkedTimeStamps.length === 0) {
    return null
  }
  const checkedObjs = checkedTimeStamps.map(moment.unix)
  const checked = checkedObjs.map(date =>
    date.isSame(selectedDay, 'day') ? date.unix() : 0
  )
  return checked.reduce((pv, cv) => Math.max(pv, cv))
}

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(moment())
  const [loadingState, setLoadingState] = useState('LOADING')
  const [rawHabits, setRawHabits] = useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await Habit.getAll()
      setLoadingState('SUCCESSFUL')
      setRawHabits(result)
      return true
    }

    fetchData()
  }, [])

  const handler = useCallback(
    ({ detail }) => {
      setRawHabits(detail.model)
    },
    [setRawHabits]
  )

  // Add event listener using our hook
  useEventListener('habitModelUpdated', handler)

  if (loadingState === 'LOADING') {
    return (
      <Layout>
        <SEO title="Dashboard" />
        <Box width="100%">
          <MenuBar />
          <Calendar
            selectedDate={selectedDate}
            handleClickOnDate={setSelectedDate}
          />
          <HabitListLoading />
        </Box>
      </Layout>
    )
  }

  if (loadingState === 'ERROR') {
    return (
      <Layout>
        <SEO title="Dashboard" />
        <Box width="100%">
          <MenuBar />
          <Calendar
            selectedDate={selectedDate}
            handleClickOnDate={setSelectedDate}
          />
          <Flex flexDirection="column">
            <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
              Oops. Something went wrong.
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
        </Box>
      </Layout>
    )
  }

  // transform habits
  const habits = rawHabits.map(habit => ({
    ...habit,
    checked: getTimestamp(habit.checked, selectedDate),
  }))

  return (
    <Layout>
      <SEO title="Dashboard" />
      <Box width="100%">
        <MenuBar />
        <Calendar
          selectedDate={selectedDate}
          handleClickOnDate={setSelectedDate}
        />
        <HabitList
          selectedTimestamp={selectedDate.unix()}
          habits={habits}
          handleUnCheckClick={async (id, tsp) => {
            const updatedModel = await Habit.uncheck(id, tsp)
            setRawHabits(updatedModel)
          }}
          handleCheckClick={async (id, tsp) => {
            const updatedModel = await Habit.check(id, tsp)
            setRawHabits(updatedModel)
          }}
        />
      </Box>
    </Layout>
  )
}
export { Dashboard }
