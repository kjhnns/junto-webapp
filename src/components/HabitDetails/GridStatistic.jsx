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
          px: [2, 4, 4],
          py: 2,
          bg: 'white',
          maxWidth: '700px',
          borderRadius: 'default',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
          gridTemplateRows:
            '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        }}
      >
        <Box> </Box>
        {grid[0].map(day => (
          <Box
            key={day.format('DDD')}
            sx={{
              fontSize: 1,
              textAlign: 'center',
            }}
          >
            {day.format('dd')}
          </Box>
        ))}

        {grid.map((week, idx) => {
          const isRepeatiousMonth =
            idx > 0 ? grid[idx - 1][6].isSame(week[6], 'month') : false
          return (
            <>
              <Box sx={{ textAlign: 'left' }}>
                {isRepeatiousMonth ? (
                  ''
                ) : (
                  <>
                    <Text
                      sx={{
                        fontSize: 1,
                        display: ['none', null, 'inline'],
                      }}
                    >
                      {week[6].format('MMMM')}
                    </Text>
                    <Text
                      sx={{
                        fontSize: 1,
                        display: ['inline', null, 'none'],
                      }}
                    >
                      {week[6].format('MMM')}
                    </Text>
                  </>
                )}
              </Box>
              {week.map(day => {
                const isChecked = momentHabitChecks
                  .map(check => check.isSame(day, 'day'))
                  .reduce((pv, cv) => pv || cv)
                const isFuture = day.isAfter(today, 'day')

                const defaultColor = isFuture ? 'gray.600' : 'gray.800'
                const style = {
                  display: 'flex',
                  color: isChecked ? 'white' : defaultColor,
                  bg: isChecked ? 'gray.800' : 'white',
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 1,
                  p: '2px',
                  m: '1px',
                  width: '25px',
                  borderRadius: 'default',
                }

                return (
                  <Flex
                    key={day.format('DDD')}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box sx={style}>{day.format('DD')}</Box>
                  </Flex>
                )
              })}
            </>
          )
        })}
      </Box>
    </Flex>
  )
}

GridStatistic.propTypes = {
  habitChecks: PropTypes.arrayOf(PropTypes.number).isRequired,
}
export { GridStatistic }
