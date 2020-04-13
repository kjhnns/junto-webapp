import React from 'react'

import { Flex } from '@components/Grid'
import { Text } from '@components/Text'

const home = () => (
  <Flex flexDirection="column" alignItems="center">
    <Text as="h1" textAlign="center">
      junto
    </Text>
    <Text as="p" textAlign="center" fontSize="24px">
      social habit tracking
    </Text>
    <Text as="p" fontStyle="italic" maxWidth="400px" mt={4} textAlign="justify">
      Good resolutions don’t work - social mechanisms do. Junto levarages
      behavioral science to help users achieve their personal goals by building
      good habits and breaking bad habits - together.
    </Text>
  </Flex>
)

export default home
