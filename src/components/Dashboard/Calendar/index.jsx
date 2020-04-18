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
    <Box
      sx={{
        bg: 'gray.800',
        py: 3,
      }}
    >
      <Flex flexDirection="column">
        <Flex flexDirection="row">
          {last5Days.map(date => (
            <Box
              sx={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '1',
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
    </Box>
  )
}

Calendar.propTypes = {
  selectedDate: PropTypes.instanceOf(moment).isRequired,
  handleClickOnDate: PropTypes.func.isRequired,
}

export { Calendar }
