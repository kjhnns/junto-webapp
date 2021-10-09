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
        <Flex justifyContent="center" alignItems="center" pr={3}>
          <DeleteDialog
            deleteHandler={async () => {
              const result = await TagManager.deleteTag(id)
              if (result) {
                await navigate('/dashboard')
              }
            }}
          />
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
            >
              {actions
                ? actions.map(action => {
                    return (
                      <Box py={2} pr={2}>
                        {action.title}
                      </Box>
                    )
                  })
                : ''}
            </Flex>
          </Box>
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <Box pl={3} flex="1">
            {streak ? (
              <Flex alignItems="center" flexDirection="row">
                <Text
                  sx={{
                    textAlign: 'center',
                    pt: 2,
                    fontSize: 3,
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

export default TagCard
