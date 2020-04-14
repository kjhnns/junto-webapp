import React, { useEffect, useState } from 'react'
import { SecondaryButton } from '@components/Button'
import { Text } from '@components/Text'
import { Flex } from '@components/Grid'
import styled, { themeGet } from '@style'
import { isLoggedIn, signOut, getUser } from '../../util/auth'
import Wrapper from './Wrapper'

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
        <Flex flexDirection="column">
          <Title>Run or Exercise</Title>
          <Motivation>to live a healthier life</Motivation>
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
