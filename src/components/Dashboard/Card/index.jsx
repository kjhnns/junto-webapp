import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import moment from 'moment'
import { Flex } from '@components/Grid'
import styled, { themeGet } from '@style'
import checkedIcon from './checked.svg'
import uncheckedIcon from './unchecked.svg'

const Wrapper = styled.div`
  display: flex;
  border: 1px solid ${themeGet('colors.grey.500')};
  border-radius: 6px;
  padding: ${themeGet('space.3')};
  min-height: 93px;
  flex: 1;
`

const Title = styled.h2`
  font-size: ${themeGet('fontSizes.4')};
  color: ${themeGet('colors.black')};
  margin: 0;
  margin-bottom: ${themeGet('space.1')};
`

const Motivation = styled.p`
  font-size: ${themeGet('fontSizes.2')};
  color: ${themeGet('colors.black')};
  margin: 0;
`
const Follower = styled.p`
  display: none;
  font-size: ${themeGet('fontSizes.2')};
  color: ${themeGet('colors.black')};
  margin: 0;

  @media (min-width: ${themeGet('breakpoints.1')}) {
    display: inline;
  }
`

const CheckMarkContainer = styled.div`
  width: 32px;
  height: 32px;
  margin: 0 2em;
`

const UnCheckCard = async (id, timestamp) => {
  try {
    const sessionCookie = window.localStorage.getItem('sessionCookie')
    const result = await axios.delete(
      `${process.env.GATSBY_API_URL}/action/${id}/event/${timestamp}`,
      {
        headers: {
          Bearer: sessionCookie,
        },
      }
    )
    return result.status === 200
  } catch (error) {
    return false
  }
}

const CheckCard = async (id, timestamp) => {
  try {
    const sessionCookie = window.localStorage.getItem('sessionCookie')
    const result = await axios.post(
      `${process.env.GATSBY_API_URL}/action/${id}/event`,
      {
        date: timestamp,
      },
      {
        headers: {
          Bearer: sessionCookie,
        },
      }
    )
    if (result.status !== 200) {
      return false
    }
    return timestamp
  } catch (error) {
    return false
  }
}

const Card = ({
  id,
  title,
  motivation,
  follower,
  checkedTimestamp,
  selectedDay,
}) => {
  const [timestamp, setTimestamp] = useState(checkedTimestamp)

  const toggleChecked = async () => {
    if (timestamp !== null) {
      if (await UnCheckCard(id, timestamp)) {
        setTimestamp(null)
      }
    } else {
      const newTimestamp = await CheckCard(id, selectedDay)
      if (newTimestamp !== false) {
        setTimestamp(newTimestamp)
      }
    }
  }

  return (
    <Wrapper>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flex="1"
      >
        <Flex alignItems="flex-start" flexDirection="column" flex="1">
          <Title>{title}</Title>
          {motivation !== null ? <Motivation>{motivation}</Motivation> : ''}
        </Flex>
        {follower !== null ? (
          <Follower>
            <strong>{follower}</strong> Followers
          </Follower>
        ) : (
          ''
        )}
        <CheckMarkContainer onClick={toggleChecked}>
          <img
            width="32px"
            height="32px"
            src={timestamp !== null ? checkedIcon : uncheckedIcon}
            alt=""
          />
        </CheckMarkContainer>
      </Flex>
    </Wrapper>
  )
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  motivation: PropTypes.string,
  follower: PropTypes.number,
  checkedTimestamp: PropTypes.number,
  selectedDay: PropTypes.number,
}

Card.defaultProps = {
  motivation: null,
  follower: null,
  checkedTimestamp: null,
  selectedDay: moment().unix(),
}

export default Card
