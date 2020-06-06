import React from 'react'
import PropTypes from 'prop-types'
import { calcXCoo, calcYCoo, DayWidth, DayHeight } from './Defaults'

const Week = ({ column, columns, checks, week }) => {
  return week.map((day, idx) => {
    const isChecked = checks
      .map(check => check.isSame(day, 'day'))
      .reduce((pv, cv) => pv || cv)

    const xCoo = calcXCoo(columns, column)
    const yCoo = calcYCoo(idx)

    return (
      <rect
        // eslint-disable-next-line react/no-array-index-key
        key={`${column}-${idx}`}
        x={xCoo}
        y={yCoo}
        width={DayWidth}
        height={DayHeight}
        fill={isChecked ? '#000' : '#ddd'}
      />
    )
  })
}

Week.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  checks: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  week: PropTypes.array.isRequired,
  column: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
}
export { Week }
