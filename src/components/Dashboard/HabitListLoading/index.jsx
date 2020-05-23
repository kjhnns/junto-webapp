import React from 'react'
import { Flex, Box } from '@components/Grid'
import { Card } from './Card'
import { PlaceholderLight } from './Placeholder'

const HabitListLoading = () => {
  return (
    <Flex flexDirection="column" alignItems="center" my={[2, 3]}>
      <Box maxWidth="800px" width="100%" my={[2, 3]} px={[2, 3, 4, 0]}>
        <Card />
      </Box>
      <Box maxWidth="800px" width="100%" my={[2, 3]} px={[2, 3, 4, 0]}>
        <Card />
      </Box>
      <Box my={3}>
        <PlaceholderLight width="200px" />
      </Box>
    </Flex>
  )
}

export { HabitListLoading }
