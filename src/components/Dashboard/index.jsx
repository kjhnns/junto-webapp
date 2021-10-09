import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'

import { Habit } from '@api'
import { SEO } from '@components/SEO'
import { Layout } from '@components/Layout'
import { MenuBar } from '@components/Navigation'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import { Button } from '@components/Button'
import { streakProcessor } from '@streak'

import { Calendar } from './Calendar'
import { HabitList } from './HabitList'
import { HabitListLoading } from './HabitListLoading'
import { useEventListener } from './EventListener'

const getHabitTimestampOfSelectedDay = (checkedTimeStamps, selectedDay) => {
  if (checkedTimeStamps === null || checkedTimeStamps.length === 0) {
    return null
  }
  const checkedObjs = checkedTimeStamps.map(moment.unix)
  const checked = checkedObjs.map(date =>
    date.isSame(selectedDay, 'day') ? date.unix() : 0
  )
  return checked.reduce((pv, cv) => Math.max(pv, cv))
}

const getLast5Days = habits => {
  const last5Days = [
    moment().subtract(4, 'day'),
    moment().subtract(3, 'day'),
    moment().subtract(2, 'day'),
    moment().subtract(1, 'day'),
    moment(),
  ]
  const lengthHabits = habits.length

  return last5Days.map(selectedDate => {
    const countHabitChecks = habits.map(habit =>
      getHabitTimestampOfSelectedDay(habit.checked, selectedDate)
    )
    if (countHabitChecks.length <= 0) {
      return { count: 0, date: selectedDate, progress: 0 }
    }
    const count = countHabitChecks.reduce((pV, cV, idx) => {
      let current = pV
      if (idx === 1 && pV > 0) {
        current = 1
      }
      if (pV === null) {
        return 0
      }
      if (cV > 0) {
        return current + 1
      }
      return current
    })
    const progress = Math.round((count / lengthHabits) * 100)
    return { count, date: selectedDate, progress }
  })
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
  useEventListener('habitModelUpdated', handler)

  const vibilityStateUpdate = useCallback(async () => {
    if (document.visibilityState === 'visible' && document.hasFocus()) {
      Habit.getAll() // trigger model update
      setSelectedDate(moment())
    }
  }, [])
  useEventListener('visibilitychange', vibilityStateUpdate)
  useEventListener('focus', vibilityStateUpdate)

  if (loadingState === 'LOADING') {
    return (
      <Layout>
        <SEO title="Dashboard" />
        <Box width="100%">
          <MenuBar active="dashboard" />
          <Calendar
            days={getLast5Days(rawHabits)}
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
          <MenuBar active="dashboard" />
          <Calendar
            days={getLast5Days(rawHabits)}
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
    ...streakProcessor(habit.checked),
    checked: getHabitTimestampOfSelectedDay(habit.checked, selectedDate),
  }))

  return (
    <Layout>
      <SEO title="Dashboard" />
      <Box width="100%">
        <MenuBar active="dashboard" />
        <Calendar
          days={getLast5Days(rawHabits)}
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
