import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Tag as TagManager } from '@api'
import { Layout } from '@components/Layout'
import { Button } from '@components/Button'
import { SEO } from '@components/SEO'
import { Flex } from '@components/Grid'
import { Text } from '@components/Typography'
import { MenuBar } from '@components/Navigation'

import { PureEditTag } from './PureEditTag'

const EditTag = ({ tagId }) => {
  const [loadingState, setLoadingState] = useState('LOADING')
  const [tag, setTag] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const resFetch = await TagManager.getAll()
      if (!resFetch) {
        setLoadingState('ERROR')
        return null
      }
      console.log(resFetch)
      const res = resFetch.filter(ptag => ptag.id === tagId)[0]
      if (!res) {
        setLoadingState('ERROR')
        return null
      }

      setTag(res)
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
      <SEO title="Edit Motivation" />
      <PureEditTag tag={tag} handleSubmit={TagManager.update} />
    </Layout>
  )
}

EditTag.propTypes = {
  tagId: PropTypes.string.isRequired,
}

export { EditTag, PureEditTag }
