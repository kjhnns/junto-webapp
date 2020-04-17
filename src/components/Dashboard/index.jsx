import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

import { signOut } from '@auth'
import { Text } from '@components/Typography'
import { Button } from '@components/Button'

import Wrapper from './Wrapper'

import { Calendar } from './Calendar'
import { HabitList } from './HabitList'

const loadHabits = async () => {
  try {
    const sessionCookie = window.localStorage.getItem('sessionCookie')
    const habits = await axios.get(`${process.env.GATSBY_API_URL}/action`, {
      headers: {
        Bearer: sessionCookie,
      },
    })
    return habits.data === null ? [] : habits.data
  } catch (error) {
    return false
  }
}

const uncheckHabit = async (id, timestamp) => {
  try {
    const sessionCookie = window.localStorage.getItem('sessionCookie')
    const result = await axios.delete(
      `${process.env.GATSBY_API_URL}/action/${id}/event/${timestamp}`,
      {
        headers: {
          Bearer: sessionCookie,
        },
      }
    )
    return result.status === 200
  } catch (error) {
    return false
  }
}

const checkHabit = async (id, timestamp) => {
  try {
    const sessionCookie = window.localStorage.getItem('sessionCookie')
    const result = await axios.post(
      `${process.env.GATSBY_API_URL}/action/${id}/event`,
      {
        date: timestamp,
      },
      {
        headers: {
          Bearer: sessionCookie,
        },
      }
    )
    return result.status === 200
  } catch (error) {
    return false
  }
}

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
      const result = await loadHabits()
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
    return null
  }

  if (loadingState === 'ERROR') {
    return <Text>Oops. Something went wrong...</Text>
  }

  // transform habits
  const habits = rawHabits.map(habit => ({
    ...habit,
    checked: getTimestamp(habit.checked, selectedDate),
  }))

  return (
    <Wrapper>
      <Text as="h1">Your Habits</Text>
      <Calendar
        selectedDate={selectedDate}
        handleClickOnDate={setSelectedDate}
      />
      <HabitList
        selectedTimestamp={selectedDate.unix()}
        habits={habits}
        handleUnCheckClick={async (id, tsp) => {
          if (await uncheckHabit(id, tsp)) {
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
          if (await checkHabit(id, tsp)) {
            const update = rawHabits.map(habit =>
              habit.id === id
                ? {
                    ...habit,
                    checked: [...habit.checked, tsp],
                  }
                : habit
            )
            setRawHabits(update)
          }
        }}
      />
      <Button width="100%" onClick={signOut}>
        Sign Out
      </Button>
    </Wrapper>
  )
}
export { Dashboard }
