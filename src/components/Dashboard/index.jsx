import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

import { signOut } from '@auth'
import { Text } from '@components/Typography'
import { Button } from '@components/Button'

import Wrapper from './Wrapper'

// import { Habits } from './Habits'
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

// const dummyHabitData = [
//   {
//     id: '12412',
//     title: 'Running',
//     checked: true,
//   },
//   {
//     id: '11232412',
//     title: 'Sleeping',
//     checked: false,
//   },
// ]

const handleClickOnHabit = id => {
  // eslint-disable-next-line no-alert
  alert(`You clicked on habit id: ${id}`)
}

const getTimestamp = (checkedTimeStamps, selectedDay) => {
  if (checkedTimeStamps === null || checkedTimeStamps.length === 0) {
    return null
  }
  const checkedObjs = checkedTimeStamps.map(moment.unix)
  const checked = checkedObjs.map(val =>
    val.isSame(selectedDay, 'day') ? val.unix() : null
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

  // here
  // transform habits
  const habits = rawHabits.map(habit => ({
    ...habit,
    checked: getTimestamp(habit.checked, selectedDate),
  }))

  return (
    <Wrapper>
      <Text as="h1">Your Habits</Text>
      {/* <Habits /> */}
      <Calendar
        selectedDate={selectedDate}
        handleClickOnDate={setSelectedDate}
      />
      <Text>{`Selected Date: ${selectedDate.format('DD-MM-YYYY')}`}</Text>
      <HabitList habits={habits} handleClickOnHabit={handleClickOnHabit} />
      <Button width="100%" onClick={signOut}>
        Sign Out
      </Button>
    </Wrapper>
  )
}
export { Dashboard }
