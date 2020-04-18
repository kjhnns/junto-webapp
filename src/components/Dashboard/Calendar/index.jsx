import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Box, Flex } from '@components/Grid'
import { Text } from '@components/Typography'

const last5Days = [
  moment().subtract(4, 'day'),
  moment().subtract(3, 'day'),
  moment().subtract(2, 'day'),
  moment().subtract(1, 'day'),
  moment(),
]

const Calendar = ({ selectedDate, handleClickOnDate }) => {
  const today = moment()

  return (
    <Flex
      sx={{
        bg: 'gray.800',
        py: 3,
      }}
      justifyContent="center"
    >
      <Flex flexDirection="column" maxWidth="800px" flex="1">
        <Flex flexDirection="row">
          {last5Days.map(date => (
            <Box
              sx={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '1',
                cursor: 'pointer',
              }}
              key={date.unix()}
              onClick={() => {
                handleClickOnDate(date)
              }}
            >
              <Text
                fontWeight={date.isSame(selectedDate, 'day') ? '700' : 'normal'}
                fontSize={3}
                color="white"
                textAlign="center"
              >
                {date.format('DD')}
              </Text>
              <Text
                color="white"
                fontWeight={date.isSame(selectedDate, 'day') ? '700' : 'normal'}
                textAlign="center"
              >
                {today.isSame(date, 'day') ? 'Today' : date.format('ddd')}
              </Text>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

Calendar.propTypes = {
  selectedDate: PropTypes.instanceOf(moment).isRequired,
  handleClickOnDate: PropTypes.func.isRequired,
}

export { Calendar }
