import React, { useState, useEffect } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'

import { Habit } from '@api'
import { Layout } from '@components/Layout'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Heading, Text } from '@components/Typography'
import { Box, Flex } from '@components/Grid'
import { MenuBar } from '@components/Navigation'

import { Statistics } from './Statistics'
import { DeleteDialog } from './DeleteDialog'

const Header = ({ habit: { title, created_at } }) => (
  <Flex width="100%" flexDirection="column" justifyContent="left">
    <Box
      sx={{
        display: ['flex', 'none', null, null],
        bg: 'gray.800',
        pt: 4,
        pb: 3,
        color: 'white',
      }}
    >
      <Box maxWidth="800px" width="100%">
        <Heading
          as="h1"
          sx={{
            fontSize: 5,
            px: [3, 0],
            pt: 3,
          }}
        >{`${title}`}</Heading>
        <Text px={[3, 0]}>
          Created on {`${moment.unix(created_at).format('YYYY-MM-DD')}`}
        </Text>
      </Box>
    </Box>
    <Box
      width="100%"
      sx={{
        display: ['none', 'flex', null, null],
      }}
    >
      <Flex
        width="100%"
        alignItems="center"
        flexDirection="column"
        justifyContent="left"
      >
        <Box width="100%" maxWidth="800px">
          <Heading
            as="h1"
            sx={{
              fontSize: 5,
              px: [3, 0],
              pt: 3,
            }}
          >{`${title}`}</Heading>
          <Text px={[3, 0]}>
            Created on {`${moment.unix(created_at).format('YYYY-MM-DD')}`}
          </Text>
        </Box>
      </Flex>
    </Box>
  </Flex>
)

const HabitDetails = ({ habitId }) => {
  const [loadingState, setLoadingState] = useState('LOADING')
  const [habit, setHabit] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const res = await Habit.getOne(habitId)
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
        <Flex
          sx={{
            minHeight: '100vh',
            bg: 'gray.100',
            flexDirection: 'column',
          }}
        >
          <MenuBar />
          <Flex
            sx={{
              p: [3, 4],
              flex: '1',
              minHeight: '100%',
              bg: 'gray.100',
              flexDirection: 'column',
            }}
          >
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
      <SEO title={habit.title} />
      <Flex
        sx={{
          minHeight: '100vh',
          bg: 'gray.100',
          flexDirection: 'column',
        }}
      >
        <MenuBar />
        <Flex
          sx={{
            p: [0, 4],
            flex: '1',
            bg: 'gray.200',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Header habit={habit} />
          <Box maxWidth="800px" width="100%">
            <Box>
              {habit.checked ? (
                <Statistics habit={habit} />
              ) : (
                <Text py={4} px={[3, 0]}>
                  No statistics available
                </Text>
              )}
            </Box>
            {habit.description ? (
              <Box>
                <Text as="h2" px={[3, 0]} py={3}>
                  Recipe
                </Text>
                <Flex
                  flexDirection="row"
                  sx={{
                    bg: 'white',
                    flex: 1,
                    borderRadius: [0, 'default'],
                    py: 3,
                    px: [3, 4, 4],
                    justifyContent: 'space-between',
                  }}
                >
                  {habit.description}
                </Flex>
              </Box>
            ) : (
              ''
            )}
            <Flex my={3} px={[3, 0]}>
              <Box mr={2}>
                <Button
                  onClick={async () => {
                    await navigate(`/dashboard/edit/${habitId}`)
                  }}
                  variant="outline"
                >
                  Edit
                </Button>
              </Box>
              <DeleteDialog
                deleteHandler={async () => {
                  const result = await Habit.remove(habitId)
                  if (result) {
                    await navigate('/dashboard')
                  }
                }}
              />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  )
}

HabitDetails.propTypes = {
  habitId: PropTypes.string.isRequired,
}

export { HabitDetails }
