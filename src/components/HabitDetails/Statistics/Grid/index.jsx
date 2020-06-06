import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Text } from '@components/Typography'
import { Flex } from '@components/Grid'
import { Week } from './Week'
import { MonthName } from './MonthName'
import { WeekName } from './WeekName'
import * as Defaults from './Defaults'

const initWeek = firstDay => {
  return [
    firstDay.clone().subtract(6, 'day'),
    firstDay.clone().subtract(5, 'day'),
    firstDay.clone().subtract(4, 'day'),
    firstDay.clone().subtract(3, 'day'),
    firstDay.clone().subtract(2, 'day'),
    firstDay.clone().subtract(1, 'day'),
    firstDay,
  ]
}

const createGrid = (week, grid, day) => {
  const trailingDay = day || moment()
  const currGrid = grid || []
  if (week < 0) {
    return currGrid
  }
  const updatedGrid = [...currGrid, initWeek(trailingDay)]
  return createGrid(
    week - 1,
    updatedGrid,
    trailingDay.clone().subtract(1, 'week')
  )
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

const Grid = ({ habitChecks }) => {
  const ref = useRef()
  const { width: componentWidth } = useResize(ref)

  const weeks = Defaults.calcColumns(componentWidth)
  const grid = createGrid(weeks)
  const gridFirstDay = moment()
    .subtract(weeks, 'week')
    .startOf('isoWeek')
    .subtract(1, 'day')

  const filteredChecks = habitChecks
    .map(check => moment.unix(check))
    .filter(d => d.isAfter(gridFirstDay))

  return (
    <Flex flexDirection="column" py={3}>
      <Flex>
        <Text as="h2" py={3}>
          Checkmarks
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        sx={{
          px: [0, 4, 4],
          py: 3,
          bg: 'white',
          maxWidth: '700px',
          borderRadius: 'default',
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
                  {showMonth ? (
                    <MonthName columns={weeks} column={idx} week={week} />
                  ) : (
                    ''
                  )}
                  <WeekName weekIdx={idx} week={week} />
                  <Week
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                    columns={weeks}
                    column={idx}
                    checks={filteredChecks}
                    week={week}
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
  habitChecks: PropTypes.arrayOf(PropTypes.number).isRequired,
}
export { Grid }
