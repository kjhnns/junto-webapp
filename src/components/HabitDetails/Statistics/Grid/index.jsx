import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Text } from '@components/Typography'
import { Flex } from '@components/Grid'
import { Week } from './Week'
import { MonthName } from './MonthName'
import { WeekName } from './WeekName'
import * as Defaults from './Defaults'

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

const createGrid = (week, grid) => {
  const currGrid = grid || []
  if (week < 0) {
    return currGrid
  }
  const updatedGrid = [initWeek(week), ...currGrid]
  return createGrid(week - 1, updatedGrid)
}

const useResize = myRef => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWidth(myRef.current.offsetWidth)
      setHeight(myRef.current.offsetHeight)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [myRef])

  return { width, height }
}

const Grid = ({ habit }) => {
  const ref = useRef()
  const { width: componentWidth } = useResize(ref)

  const momentChecked = habit.checked.map(check => moment.unix(check))
  const weeksFromSpace = Defaults.calcColumns(componentWidth)

  const weeksFromFirstDay = moment().diff(
    // momentChecked[0] ||
    moment.unix(habit.created_at),
    'weeks'
  )
  const adjustedWeeks = Math.min(weeksFromFirstDay, weeksFromSpace)

  const grid = createGrid(adjustedWeeks)
  const gridFirstDay = moment()
    .subtract(adjustedWeeks, 'week')
    .startOf('isoWeek')
    .subtract(1, 'day')
  const filteredChecks = momentChecked.filter(d => d.isAfter(gridFirstDay))

  return (
    <Flex flexDirection="column" py={3}>
      <Flex px={[3, 0]}>
        <Text as="h2" py={3}>
          Checkmarks
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        sx={{
          px: [1, 4, 4],
          py: 3,
          bg: 'white',
          borderRadius: [0, 'default'],
        }}
        py={3}
      >
        <Flex ref={ref}>
          <svg
            style={{
              fontFamily:
                'Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif',
              width: '100%',
              background: '#fff',
            }}
            height="110"
          >
            {grid.map((week, idx) => {
              const showMonth =
                (idx + 1 < grid.length &&
                  !grid[idx + 1][6].isSame(week[6], 'month')) ||
                idx === grid.length - 1
              return (
                <>
                  <MonthName
                    show={showMonth}
                    columns={adjustedWeeks}
                    column={idx}
                    week={week}
                  />
                  <WeekName weekIdx={idx} week={week} />
                  <Week
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                    columns={adjustedWeeks}
                    column={idx}
                    checks={filteredChecks}
                    week={week}
                    createdAt={habit.created_at}
                  />
                </>
              )
            })}
          </svg>
        </Flex>
      </Flex>
    </Flex>
  )
}

Grid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  habit: PropTypes.object.isRequired,
}
export { Grid }
