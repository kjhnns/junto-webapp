import React from 'react'
import PropTypes from 'prop-types'
import { calcXCoo } from './Defaults'

const MonthName = ({ show, columns, column, week }) => {
  const xCoo = calcXCoo(columns, column)
  if (!show) {
    return ''
  }

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
  column: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  columns: PropTypes.number.isRequired,
}

export { MonthName }
