import React from 'react'
import PropTypes from 'prop-types'
import { calcYCoo } from './Defaults'

const WeekName = ({ weekIdx, week }) => {
  if (weekIdx !== 0) {
    return ''
  }

  return (
    <>
      {week.map((day, ii) => {
        if (ii % 2 === 0) {
          return ''
        }

        return (
          // eslint-disable-next-line react/jsx-key
          <text
            // eslint-disable-next-line react/no-array-index-key
            style={{
              fontSize: 9,
              fill: 'gray.500',
            }}
            x={3}
            y={calcYCoo(ii) + 8}
          >
            {day.format('dd')}
          </text>
        )
      })}
    </>
  )
}
WeekName.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  week: PropTypes.array.isRequired,
  weekIdx: PropTypes.number.isRequired,
}

export { WeekName }
