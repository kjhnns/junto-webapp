import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'

const initWeek = subWeeks => {
  const firstDay = moment()
    .subtract(subWeeks, 'week')
    .startOf('isoWeek')
  return [
    firstDay,
    firstDay.clone().add(1, 'day'),
    firstDay.clone().add(2, 'day'),
    firstDay.clone().add(3, 'day'),
    firstDay.clone().add(4, 'day'),
    firstDay.clone().add(5, 'day'),
    firstDay.clone().add(6, 'day'),
  ]
}

const grid = [
  initWeek(12),
  initWeek(11),
  initWeek(10),
  initWeek(9),
  initWeek(8),
  initWeek(7),
  initWeek(6),
  initWeek(5),
  initWeek(4),
  initWeek(3),
  initWeek(2),
  initWeek(1),
  initWeek(0),
]

const GridStatistic = ({ habitChecks }) => {
  const momentHabitChecks = habitChecks.map(check => moment.unix(check))

  const today = moment()
  return (
    <Flex flexDirection="column" py={3}>
      <Box>
        <Text as="h2" py={3}>
          Last Quarter
        </Text>
      </Box>
      <Box
        display="grid"
        sx={{
          px: 4,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
          gridTemplateRows:
            '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        }}
      >
        <Box> </Box>
        {grid[0].map(day => (
          <Box key={day.format('DDD')} sx={{ textAlign: 'center' }}>
            {day.format('dd')}
          </Box>
        ))}
        {grid.map(week => (
          <>
            <Box sx={{ textAlign: 'left' }}>
              <Text sx={{ display: ['none', null, 'inline'] }}>
                {week[0].format('MMMM')}
              </Text>
              <Text sx={{ display: ['inline', null, 'none'] }}>
                {week[0].format('MMM')}
              </Text>
            </Box>
            {week.map(day => {
              const isToday = day.isSame(today, 'day')
              const isChecked = momentHabitChecks
                .map(check => check.isSame(day, 'day'))
                .reduce((pv, cv) => pv || cv)
              const isFuture = day.isAfter(today, 'day')

              const defaultColor = isFuture ? 'gray.600' : 'gray.800'
              const style = {
                display: 'flex',
                fontWeight: isToday ? 600 : 400,
                color: isChecked ? 'white' : defaultColor,
                bg: isChecked ? 'green.700' : 'white',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'gray.600',
                fontSize: 1,
                border: 'solid',
                borderWidth: '1px',
                m: '3px',
                p: '2px',
              }

              return (
                <Box key={day.format('DDD')}>
                  <Box sx={style}>{day.format('DD')}</Box>
                </Box>
              )
            })}
          </>
        ))}
      </Box>
    </Flex>
  )
}

GridStatistic.propTypes = {
  habitChecks: PropTypes.arrayOf(PropTypes.number).isRequired,
}
export { GridStatistic }
