import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { Habit } from '@api'
import { SEO } from '@components/SEO'
import { Layout } from '@components/Layout'
import { MenuBar } from '@components/Navigation'
import { Text } from '@components/Typography'
import { Box } from '@components/Grid'

import { Calendar } from './Calendar'
import { HabitList } from './HabitList'
import { HabitListLoading } from './HabitListLoading'

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

  const isOnline = window ? window.navigator.onLine : false

  useEffect(() => {
    async function fetchData() {
      const result = await Habit.getAll()
      if (result === false) {
        setLoadingState('ERROR')
        return null
      }
      setLoadingState('SUCCESSFUL')
      setRawHabits(result)
      return true
    }

    fetchData()
  }, [])

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

          {isOnline ? (
            <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
              Oops. Something went wrong.
            </Text>
          ) : (
            <Text
              textAlign="center"
              fontWeight="600"
              color="gray.700"
              fontSize={4}
              m={5}
            >
              You are offline
            </Text>
          )}
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
            if (await Habit.uncheck(id, tsp)) {
              const update = rawHabits.map(habit =>
                habit.id === id
                  ? {
                      ...habit,
                      checked: habit.checked.filter(chked => chked !== tsp),
                    }
                  : habit
              )
              setRawHabits(update)
            }
          }}
          handleCheckClick={async (id, tsp) => {
            if (await Habit.check(id, tsp)) {
              const update = rawHabits.map(habit =>
                habit.id === id
                  ? {
                      ...habit,
                      checked: habit.checked ? [...habit.checked, tsp] : [tsp],
                    }
                  : habit
              )
              setRawHabits(update)
            }
          }}
        />
      </Box>
    </Layout>
  )
}
export { Dashboard }
