import React from 'react'
import PropTypes from 'prop-types'

import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'

const HabitCard = ({ habit, active, onClickHandler }) => (
  <Box width="100%" my={[2, 3]} px={[2, 3, 4, 0]}>
    <Flex
      sx={{
        borderRadius: 'default',
        px: [3, 4, 4],
        // minHeight: ['80px', '93px', '93px'],
        flex: '1',
      }}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flex="1"
      >
        <Flex alignItems="center" flexDirection="row" flex="1">
          <Box>
            <Text
              onClick={onClickHandler}
              // as="h2"
              sx={{
                fontSize: [3, 4, 4],
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              {habit.title}
            </Text>
          </Box>
          <Box pl={2}>{active ? ' (selected)' : ''}</Box>
        </Flex>
      </Flex>
    </Flex>
  </Box>
)

HabitCard.propTypes = {
  habit: PropTypes.objectOf({
    title: PropTypes.string.isRequired,
  }).isRequired,
  active: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
}

export default HabitCard
