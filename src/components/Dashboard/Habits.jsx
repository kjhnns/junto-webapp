import React, { useState, useEffect } from 'react'
import { Flex } from '@components/Grid'
import axios from 'axios'
import moment from 'moment'
import { Text } from '@components/Typography'
import Card from './Card'

const UNEXPECTED_ERROR = -1
const LOADING = 0
const DISPLAY_HABITS = 1

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

const getTimestamp = checkedTimeStamps => {
  const selectedDay = moment()
  if (checkedTimeStamps === null || checkedTimeStamps.length === 0) {
    return null
  }
  const checkedObjs = checkedTimeStamps.map(moment.unix)
  const checked = checkedObjs.map(val =>
    val.isSame(selectedDay, 'day') ? val.unix() : null
  )
  return checked.reduce((pv, cv) => Math.max(pv, cv))
}

const HabitList = () => {
  const [state, setState] = useState(LOADING)
  const [habits, setHabits] = useState([])

  useEffect(() => {
    // eslint-disable-next-line func-names
    ;(async function() {
      if (state === LOADING) {
        const result = await loadHabits()
        if (result === false) {
          setState(UNEXPECTED_ERROR)
          setHabits([])
          return
        }
        setState(DISPLAY_HABITS)
        setHabits(result)
      }
    })()
  })

  return (
    <>
      <Flex flexDirection="column">
        {state === UNEXPECTED_ERROR ? <Text>Error</Text> : ''}
        {state === LOADING ? <Text>Loading</Text> : ''}
        {state === DISPLAY_HABITS
          ? habits.map(({ id, title, checked }) => (
              <Flex my={2} key={id}>
                <Card
                  title={title}
                  id={id}
                  checkedTimestamp={getTimestamp(checked)}
                />
              </Flex>
            ))
          : ''}
      </Flex>
    </>
  )
}

export default HabitList
