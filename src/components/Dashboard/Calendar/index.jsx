import React from 'react'
import styled, { themeGet } from '@style'
import moment from 'moment'
import { Flex } from '@components/Grid'

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${themeGet('space.3')};
  flex: 1;
`

const last5Days = [
  moment().subtract(4, 'day'),
  moment().subtract(3, 'day'),
  moment().subtract(2, 'day'),
  moment().subtract(1, 'day'),
  moment(),
]

const DayTitle = styled.div`
  font-size: ${themeGet('fontSizes.2')};
`
const DayNo = styled.div`
  font-size: ${themeGet('fontSizes.4')};
`

const Calendar = () => {
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row">
        {last5Days.map(val => (
          <Day key={val.unix()}>
            <DayTitle>{val.format('dd')}</DayTitle>
            <DayNo>{val.format('DD')}</DayNo>
          </Day>
        ))}
      </Flex>
    </Flex>
  )
}

export default Calendar
