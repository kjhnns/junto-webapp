import React from 'react'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import { Placeholder } from './Placeholder'

const Card = () => {
  return (
    <Flex
      sx={{
        bg: 'gray.400',
        borderRadius: 'default',
        px: [3, 4, 4],
        minHeight: ['80px', '93px', '93px'],
        flex: '1',
      }}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flex="1"
      >
        <Flex alignItems="flex-start" flexDirection="column" flex="1">
          <Text as="h2" sx={{ fontSize: [3, 4, 4] }}>
            <Placeholder width="200px" />
          </Text>
        </Flex>
        <Box ml={3}>
          <Box
            sx={{
              cursor: 'pointer',
              borderRadius: '30px',
              bg: 'gray.200',
              width: ['45px', '50px', '50px'],
              height: ['45px', '50px', '50px'],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {' '}
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}

export { Card }
