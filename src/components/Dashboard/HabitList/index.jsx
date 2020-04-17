import React from 'react'
import PropTypes from 'prop-types'

import { Flex } from '@components/Grid'
import { Text } from '@components/Typography'

import Card from './Card'

const HabitList = ({
  selectedTimestamp,
  habits,
  handleUnCheckClick,
  handleCheckClick,
}) => {
  if (!habits.length) {
    return <Text>No habits found.</Text>
  }

  return (
    <Flex flexDirection="column">
      {habits.map(({ id, title, checked }) => (
        <Card
          key={id}
          title={title}
          checked={checked > 0}
          handleClick={() => {
            if (checked > 0) {
              handleUnCheckClick(id, checked)
            } else {
              handleCheckClick(id, selectedTimestamp)
            }
          }}
        />
      ))}
    </Flex>
  )
}

HabitList.defaultProps = {
  habits: [],
}

HabitList.propTypes = {
  selectedTimestamp: PropTypes.number.isRequired,
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      checked: PropTypes.number,
    })
  ),
  handleCheckClick: PropTypes.func.isRequired,
  handleUnCheckClick: PropTypes.func.isRequired,
}

export { HabitList }
