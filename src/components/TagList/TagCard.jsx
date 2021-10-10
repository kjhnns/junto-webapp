import React from 'react'
import { navigate } from 'gatsby'
import { Tag as TagManager } from '@api'

import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import { DeleteDialog } from './DeleteDialog'

const TagCard = ({
  tag: { id, label, actions, streak, streakDays, streakIncToday },
}) => (
  <Box width="100%" my={[2, 3]} px={[2, 3, 4, 0]}>
    <Flex
      sx={{
        px: [3, 4, 4],
        // minHeight: ['80px', '93px', '93px'],
        flex: '1',
        bg: 'gray.200',
      }}
    >
      <Flex
        flexDirection="row"
        alignItems="stretch"
        justifyContent="space-between"
        flex="1"
        p={2}
      >
        <Flex justifyContent="center" alignItems="center" width="15%">
          <Box pr={3} flex="1" width="100%">
            <Flex alignItems="center" flexDirection="row" width="100%">
              <Text
                sx={{
                  textAlign: 'center',
                  pt: 2,
                  fontSize: 3,
                  pr: 3,
                  width: '100%',
                  color: streakIncToday ? 'gray.800' : 'gray.500',
                }}
              >
                {streak ? streakDays : '-'}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Flex alignItems="flex-start" flexDirection="column" flex="1">
          <Box flex="1" pt={2} sx={{ width: '100%' }}>
            <Text
              // as="h2"
              sx={{
                fontSize: [3, 4, 4],
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                textOverflow: 'ellipsis',
              }}
              onClick={async () => {
                await navigate(`/dashboard/tags/edit/${id}`)
              }}
            >
              {label}
            </Text>
          </Box>
          <Box>
            <Flex
              alignItems="center"
              flexDirection="row"
              flex="1"
              sx={{ flexFlow: 'wrap' }}
              px={2}
              py={2}
            >
              {actions
                ? actions.map(action => {
                    return (
                      <Box
                        pt={3}
                        pr={3}
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
          </Box>
          <Box width="100%">
            <Flex justifyContent="right" alignItems="center">
              <DeleteDialog
                deleteHandler={async () => {
                  const result = await TagManager.deleteTag(id)
                  if (result) {
                    await navigate('/dashboard')
                  }
                }}
              />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  </Box>
)

export default TagCard
