import React, { useEffect, useState } from 'react'
import { SecondaryButton } from '@components/Button'
import { Text } from '@components/Text'
import { Flex } from '@components/Grid'
import styled, { themeGet } from '@style'
import { isLoggedIn, signOut, getUser } from '../../util/auth'
import Wrapper from './Wrapper'
import checked from './checked.svg'
import unchecked from './unchecked.svg'

const Card = styled.div`
  display: flex;
  border: 1px solid ${themeGet('colors.grey.500')};
  border-radius: 6px;
  padding: ${themeGet('space.3')};
  margin: 20px;
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
  font-size: ${themeGet('fontSizes.2')};
  color: ${themeGet('colors.black')};
  margin: 0;
`

const CheckMarkContainer = styled.div`
  width: 32px;
  height: 32px;
  margin: 0 2em;
`

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line func-names
    ;(async function() {
      const res = await isLoggedIn()
      setLoggedIn(res)
    })()
  })

  return (
    <Wrapper>
      <Text as="h1">Your Habits</Text>
      <Card>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flex="1"
        >
          <Flex flexDirection="column" flex="1">
            <Title>Run or Exercise</Title>
            <Motivation>to live a healthier life</Motivation>
          </Flex>
          <Follower>
            <strong>4</strong> Followers
          </Follower>
          <CheckMarkContainer>
            <img width="32px" height="32px" src={checked} alt="" />
          </CheckMarkContainer>
        </Flex>
      </Card>

      <Card>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flex="1"
        >
          <Flex flexDirection="column" flex="1">
            <Title>Run or Exercise</Title>
            <Motivation>to live a healthier life</Motivation>
          </Flex>
          <Follower>
            <strong>4</strong> Followers
          </Follower>
          <CheckMarkContainer>
            <img width="32px" height="32px" src={unchecked} alt="" />
          </CheckMarkContainer>
        </Flex>
      </Card>
      {loggedIn !== null ? `Hello ${getUser().displayName}` : ''}
      <SecondaryButton width="100%" onClick={signOut}>
        Sign Out
      </SecondaryButton>
    </Wrapper>
  )
}
export default Dashboard
