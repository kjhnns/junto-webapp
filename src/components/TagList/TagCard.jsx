import React from 'react'
import { navigate } from 'gatsby'
import { Tag as TagManager } from '@api'

import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import { DeleteDialog } from './DeleteDialog'
import { Button } from '@components/Button'

const TagCard = ({
  tag: { id, label, actions, streak, streakDays, streakIncToday },
}) => (
  <Box width="100%" my={[3, 4]} px={[2, 3, 4, 0]}>
    <Flex
      sx={{
        px: [3, 4, 4],
        // minHeight: ['80px', '93px', '93px'],
        flex: '1',
        // bg: 'gray.800',
        flexDirection: 'column',
      }}
    >
      <Flex
        flexDirection="row"
        alignItems="stretch"
        justifyContent="space-between"
        flex="1"
        pt={4}
      >
        <Flex alignItems="center">
          <Text
            // as="h2"
            sx={{
              pt: 3,
              fontSize: [5, 6, 6],
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              // color: 'gray.100',
            }}
          >
            {label}
          </Text>
        </Flex>

        <Flex alignItems="center">
          <Text
            sx={{
              textAlign: 'center',
              fontSize: [5, 6, 6],
              color: streakIncToday ? 'gray.900' : 'gray.400',
            }}
          >
            {streak ? streakDays : ''}
          </Text>
        </Flex>
      </Flex>

      <Flex flexDirection="row" flex="1" pt={2} sx={{ flexFlow: 'wrap' }}>
        {actions
          ? actions.map(action => {
              return (
                <Box
                  key={action.id}
                  sx={{
                    // color: 'gray.100',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                  mt={3}
                  mr={4}
                  onClick={async () => {
                    await navigate(`/dashboard/details/${action.id}`)
                  }}
                >
                  {action.title}
                </Box>
              )
            })
          : ''}
      </Flex>

      <Flex flexDirection="row" flex="1" py={2}>
        <Box>
          <Button
            variant="clear"
            onClick={async () => {
              await navigate(`/dashboard/tags/${id}`)
            }}
            variant="clear"
          >
            Habits
          </Button>
        </Box>
        <Box>
          <Button
            variant="clear"
            onClick={async () => {
              await navigate(`/dashboard/tags/edit/${id}`)
            }}
          >
            Edit
          </Button>
        </Box>
        <Box>
          <DeleteDialog
            deleteHandler={async () => {
              const result = await TagManager.deleteTag(id)
              if (result) {
                await navigate('/dashboard')
              }
            }}
          />
        </Box>
      </Flex>
      <Flex justifyContent="center" my={3}>
        <Box sx={{ width: '60%', borderBottom: '3px #CCC solid' }}></Box>
      </Flex>
    </Flex>
  </Box>
)

export default TagCard
