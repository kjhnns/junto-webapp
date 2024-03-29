import React, { useState, useEffect } from 'react'

import { Tag as TagManager } from '@api'
import { Layout } from '@components/Layout'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import { MenuBar } from '@components/Navigation'
import { streakProcessor } from '@streak'

import List from './List'

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
          <MenuBar active="tags" />
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
          <MenuBar active="tags" />
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
        <List tags={tags} />
      </Box>
    </Layout>
  )
}

export { TagList }
