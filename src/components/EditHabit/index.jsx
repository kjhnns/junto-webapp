import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Habit as HabitManager } from '@api'
import { Layout } from '@components/Layout'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Flex } from '@components/Grid'
import { Text } from '@components/Typography'
import { MenuBar } from '@components/Navigation'

import { PureEditHabit } from './PureEditHabit'

const EditHabit = ({ habitId }) => {
  const [loadingState, setLoadingState] = useState('LOADING')
  const [habit, setHabit] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const res = await HabitManager.getOne(habitId)
      if (res === null) {
        setLoadingState('ERROR')
        return null
      }
      setHabit(res)
      setLoadingState('SUCCESSFUL')
      return true
    }
    fetchData()
  }, [habitId])

  if (loadingState === 'LOADING') {
    return (
      <Layout>
        <Flex width="100%" flexDirection="column">
          <MenuBar />
          <Flex flexDirection="column">
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
            s
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
      <SEO title="Edit habit" />
      <PureEditHabit habit={habit} handleSubmit={HabitManager.update} />
    </Layout>
  )
}

EditHabit.propTypes = {
  habitId: PropTypes.string.isRequired,
}

export { EditHabit, PureEditHabit }
