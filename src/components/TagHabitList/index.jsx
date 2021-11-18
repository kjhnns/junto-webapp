import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Habit as HabitManager, Tag as TagManager } from '@api'
import { Layout } from '@components/Layout'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import { MenuBar } from '@components/Navigation'

import HabitList from './HabitList'

const TagHabitList = ({ tagId }) => {
  const [loadingState, setLoadingState] = useState('LOADING')
  const [habits, setHabits] = useState([])
  const [tag, setTag] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const resHabits = await HabitManager.getAll()
      const resTags = await TagManager.getAll()
      if (resTags === null) {
        setLoadingState('ERROR')
        return null
      }
      const tag = resTags.filter(t => t.id === tagId)
      setHabits(resHabits)
      setTag(tag[0])
      setLoadingState('SUCCESSFUL')
      return true
    }
    fetchData()
  }, [tagId])

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
      <Flex
        sx={{
          minHeight: '100vh',
          bg: 'gray.100',
          flexDirection: 'column',
        }}
        flexDirection="column"
      >
        <MenuBar />
        <Box
          maxWidth="800px"
          sx={{
            width: '100%',
          }}
          flex="1"
          mx="auto"
        >
          <SEO title="Motivations" />
          <Flex
            sx={{
              p: [3, 4],
              flex: '1',
              minHeight: '100%',
              width: '100%',
              bg: 'gray.100',
              flexDirection: 'column',
            }}
          >
            <h1>{tag.label}</h1>
            <HabitList habits={habits} />
          </Flex>
        </Box>
      </Flex>
    </Layout>
  )
}

TagHabitList.propTypes = {
  tagId: PropTypes.string.isRequired,
  habit: PropTypes.string.isRequired,
}

export { TagHabitList }
