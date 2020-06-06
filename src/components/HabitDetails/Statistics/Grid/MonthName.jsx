import React from 'react'
import PropTypes from 'prop-types'
import { calcXCoo } from './Defaults'

const MonthName = ({ columns, column, week }) => {
  const xCoo = calcXCoo(columns, column)
  return (
    <text
      // eslint-disable-next-line react/no-array-index-key
      key={`monthName_${week[6].format('MM')}`}
      style={{
        fontSize: 9,
        fill: 'gray.500',
      }}
      x={xCoo - 1}
      y={12}
    >
      {week[6].format('MMM')}
    </text>
  )
}

MonthName.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  week: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  column: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
}

export { MonthName }
