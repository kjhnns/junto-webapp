import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Habit as HabitManager, Tag as TagManager } from '@api'
import { Layout } from '@components/Layout'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import { MenuBar } from '@components/Navigation'
import { Link } from '@components/Link'

const TagCard = ({ tag, active, onClickHandler }) => (
  <Box width="100%" my={[2, 3]} px={[2, 3, 4, 0]}>
    <Flex
      sx={{
        borderRadius: 'default',
        px: [3, 4, 4],
        // minHeight: ['80px', '93px', '93px'],
        flex: '1',
      }}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flex="1"
      >
        <Flex alignItems="center" flexDirection="row" flex="1">
          <Box>
            <Text
              onClick={onClickHandler}
              // as="h2"
              sx={{
                fontSize: [3, 4, 4],
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              {tag.label}
            </Text>
          </Box>
          <Box pl={2}>{active ? ' (active)' : ''}</Box>
        </Flex>
      </Flex>
    </Flex>
  </Box>
)

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
              habit.tags.filter(htag => htag.id == tag.id).length > 0
            return (
              <TagCard
                key={tag.id}
                onClickHandler={async () => {
                  if (active) {
                    if (await TagManager.remove({ habitId, tagId: tag.id })) {
                      const updatedTags = habit.tags.filter(
                        tagp => tagp.id != tag.id
                      )
                      setHabit({ ...habit, tags: updatedTags })
                    }
                  } else {
                    if (await TagManager.append({ habitId, tagId: tag.id })) {
                      const updatedTags = [
                        { id: tag.id, label: tag.label },
                        ...habit.tags,
                      ]
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
}

export { HabitTagList }
