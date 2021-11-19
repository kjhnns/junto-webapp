import React from 'react'

import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import { Link } from '@components/Link'

import TagCard from './TagCard'

const List = ({ tags }) => {
  if (!tags.length) {
    return (
      <Flex flexDirection="column" alignItems="center" my={[2, 3]}>
        <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
          Motivations cluster your habits to help you keep track of the bigger
          picture. Let's start!
        </Text>

        <Flex flexDirection="column" alignItems="center" my={4}>
          <Link sx={{ fontWeight: 600, fontSize: 4 }} to="/dashboard/tags/new">
            Add Motivation
          </Link>
        </Flex>
      </Flex>
    )
  }

  return (
    <Box
      maxWidth="800px"
      sx={{
        width: '100%',
      }}
      flex="1"
      mx="auto"
    >
      {tags.map(tag => (
        <TagCard key={tag.id} tag={tag} />
      ))}

      <Flex flexDirection="column" alignItems="center" my={4}>
        <Link sx={{ fontWeight: 600, fontSize: 4 }} to="/dashboard/tags/new">
          Add Motivation
        </Link>
      </Flex>
    </Box>
  )
}

export default List
