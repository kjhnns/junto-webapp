import React, { useState, useEffect } from 'react'

import { Tag as TagManager, Habit as HabitManager } from '@api'
import { Layout } from '@components/Layout'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import { MenuBar } from '@components/Navigation'
import { Link } from '@components/Link'
import { streakProcessor } from '@api/Streak'

const TagCard = ({
  tag: { label, actions, streak, streakDays, streakIncToday },
}) => (
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
              // as="h2"
              sx={{
                fontSize: [3, 4, 4],
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              {label}
            </Text>
          </Box>
          <Box>
            <Flex alignItems="center" flexDirection="row" flex="1">
              {actions
                ? actions.map(action => {
                    return <Box>{action.title}, </Box>
                  })
                : ''}
            </Flex>
          </Box>
          <Box pl={2}>
            {streak ? (
              <Flex alignItems="center" flexDirection="row">
                <Text
                  sx={{
                    textAlign: 'center',
                    py: 2,
                    pl: 3,
                    color: streakIncToday ? 'gray.800' : 'gray.500',
                  }}
                >
                  {streakDays}
                </Text>
              </Flex>
            ) : (
              ''
            )}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  </Box>
)

const TagList = () => {
  const [loadingState, setLoadingState] = useState('LOADING')
  const [rawTags, setTags] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const resTags = await TagManager.getAll()
      if (resTags === null) {
        setLoadingState('ERROR')
        return null
      }
      setTags(resTags)
      setLoadingState('SUCCESSFUL')
      return true
    }
    fetchData()
  }, [])

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

  // transform tags
  const tags = rawTags.map(tag => ({
    ...tag,
    ...streakProcessor(tag.checked),
  }))
  return (
    <Layout>
      <SEO title="Motivations" />
      <Box width="100%">
        <MenuBar active="tags" />
        <h1>Motivations</h1>

        {tags.map(tag => (
          <TagCard tag={tag} />
        ))}

        <Flex flexDirection="column" alignItems="center" my={3}>
          <Link sx={{ fontWeight: 600, fontSize: 4 }} to="/dashboard/tags/new">
            Add Motivation
          </Link>
        </Flex>
      </Box>
    </Layout>
  )
}

export { TagList }
