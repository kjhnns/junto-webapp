/* stylelint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled'

import { Box, Flex } from '@components/Grid'
import { Text } from '@components/Typography'

const UnderlinedText = styled(Text)`
  position: relative;
  padding-bottom: 3px;
  margin-bottom: 4px;

  &::after {
    content: '';
    left: 0;
    bottom: -4px;
    right: 0;
    margin: 0 auto;
    position: absolute;
    width: 25px;
    height: 3px;
    border-radius: 15px;
    background: #fff;
    background-image: linear-gradient(
      90deg,
      transparent ${props => props.progress}%,
      ${props => props.theme.colors.gray[700]} ${props => props.progress}%
    );
  }
`

const Calendar = ({ days, selectedDate, handleClickOnDate }) => {
  const today = moment()

  return (
    <Flex
      sx={{
        bg: 'gray.800',
        py: 3,
      }}
      justifyContent="center"
    >
      <Flex flexDirection="column" maxWidth="800px" flex="1">
        <Flex flexDirection="row">
          {days.map(({ date, progress }) => (
            <Box
              sx={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '1',
                cursor: 'pointer',
              }}
              key={date.unix()}
              onClick={() => {
                handleClickOnDate(date)
              }}
            >
              <Text
                fontWeight={date.isSame(selectedDate, 'day') ? '700' : 'normal'}
                fontSize={3}
                color={date.isSame(selectedDate, 'day') ? 'white' : 'gray.400'}
                textAlign="center"
              >
                {date.format('DD')}
              </Text>
              <UnderlinedText
                progress={progress}
                color={date.isSame(selectedDate, 'day') ? 'white' : 'gray.400'}
                fontWeight={date.isSame(selectedDate, 'day') ? '700' : 'normal'}
                textAlign="center"
              >
                {today.isSame(date, 'day') ? 'Today' : date.format('ddd')}
              </UnderlinedText>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

Calendar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  days: PropTypes.array.isRequired,
  selectedDate: PropTypes.instanceOf(moment).isRequired,
  handleClickOnDate: PropTypes.func.isRequired,
}

export { Calendar }
