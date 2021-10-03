import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Habit as HabitManager, Tag as TagManager } from '@api'
import { Layout } from '@components/Layout'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Flex } from '@components/Grid'
import { Text } from '@components/Typography'
import { MenuBar } from '@components/Navigation'
import { Link } from '@components/Link'

const HabitTagList = ({ habitId }) => {
  const [loadingState, setLoadingState] = useState('LOADING')
  const [habit, setHabit] = useState({})
  const [tags, setTags] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const resHabit = await HabitManager.getOne(habitId)
      const resTags = await TagManager.getAll()
      if (resHabit === null) {
        setLoadingState('ERROR')
        return null
      }
      setHabit(resHabit)
      setTags(resTags)
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
  console.log(habit.tags)

  return (
    <Layout>
      <SEO title="Tags" />
      <h1>Tags</h1>
      {tags.map(tag => {
        if (habit.tags && habit.tags.indexOf(tag.label) >= 0) {
          return (
            <p
              style={{ fontWeight: 800, cursor: 'pointer' }}
              onClick={() => TagManager.remove({ habitId, tagId: tag.id })}
            >
              {tag.label}
            </p>
          )
        }
        return (
          <p
            style={{ fontWeight: 300, cursor: 'pointer' }}
            onClick={() => TagManager.append({ habitId, tagId: tag.id })}
          >
            {tag.label}
          </p>
        )
      })}

      <Flex flexDirection="column" alignItems="center" my={3}>
        <Button variant="clear" as={Link} to={`/dashboard/details/${habitId}`}>
          close
        </Button>
      </Flex>
    </Layout>
  )
}

HabitTagList.propTypes = {
  habitId: PropTypes.string.isRequired,
}

export { HabitTagList }
