import React from 'react'
import PropTypes from 'prop-types'

import { Text } from '@components/Typography'

const HabitList = ({ habits, handleClickOnHabit }) => {
  if (!habits.length) {
    return <Text>No habits found.</Text>
  }

  return (
    <ul>
      {habits.map(({ id, title, checked }) => (
        <li key={id} onClick={() => handleClickOnHabit(id)}>{`${title} – ${
          checked ? 'DONE' : 'NOT DONE'
        }`}</li>
      ))}
    </ul>
  )
}

HabitList.defaultProps = {
  habits: [],
}

HabitList.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      checked: PropTypes.number.isRequired,
    })
  ),
  handleClickOnHabit: PropTypes.func.isRequired,
}

export { HabitList }
