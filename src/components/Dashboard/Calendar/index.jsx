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

const Calendar = ({ selectedDay, selectDayHandler }) => {
  const today = moment()

  return (
    <Box
      sx={{
        bg: 'gray.200',
        py: 3,
      }}
    >
      <Flex flexDirection="column">
        <Flex flexDirection="row">
          {last5Days.map(val => (
            <Box
              sx={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '1',
              }}
              key={val.unix()}
              onClick={() => {
                selectDayHandler(val)
              }}
            >
              <Text
                fontWeight={val.isSame(selectedDay, 'day') ? 'bold' : 'normal'}
                fontSize={3}
                textAlign="center"
              >
                {val.format('DD')}
              </Text>
              <Text
                fontWeight={val.isSame(selectedDay, 'day') ? 'bold' : 'normal'}
                textAlign="center"
              >
                {today.isSame(val, 'day') ? 'today' : val.format('ddd')}
              </Text>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

Calendar.propTypes = {
  selectedDay: PropTypes.instanceOf(moment).isRequired,
  selectDayHandler: PropTypes.func.isRequired,
}

export default Calendar
