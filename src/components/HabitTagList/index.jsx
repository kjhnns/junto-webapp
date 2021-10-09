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

import TagCard from './TagCard'

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
        <SEO title="Motivations" />
        <Flex
          sx={{
            p: [3, 4],
            flex: '1',
            minHeight: '100%',
            bg: 'gray.100',
            flexDirection: 'column',
          }}
        >
          <h1>Motivations</h1>
          {tags.map(tag => {
            const active =
              habit.tags &&
              habit.tags.filter(htag => htag.id === tag.id).length > 0
            return (
              <TagCard
                key={tag.id}
                onClickHandler={async () => {
                  if (active) {
                    if (await TagManager.remove({ habitId, tagId: tag.id })) {
                      const updatedTags = habit.tags.filter(
                        tagp => tagp.id !== tag.id
                      )
                      setHabit({ ...habit, tags: updatedTags })
                    }
                  } else {
                    await TagManager.append({ habitId, tagId: tag.id })
                    if (habit.tags !== null) {
                      const updatedTags = [
                        { id: tag.id, label: tag.label },
                        ...habit.tags,
                      ]
                      setHabit({ ...habit, tags: updatedTags })
                    } else {
                      const updatedTags = [{ id: tag.id, label: tag.label }]
                      setHabit({ ...habit, tags: updatedTags })
                    }
                  }
                }}
                tag={tag}
                active={active}
              />
            )
          })}

          <Flex flexDirection="column" alignItems="center" my={3}>
            <Button
              variant="clear"
              as={Link}
              to={`/dashboard/details/${habitId}`}
            >
              close
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  )
}

HabitTagList.propTypes = {
  habitId: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
}

export { HabitTagList }
