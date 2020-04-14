import React from 'react'
import firebase from 'gatsby-plugin-firebase'
import { SecondaryButton } from '@components/Button'
import { Text } from '@components/Text'
import { Flex } from '@components/Grid'
import styled, { themeGet } from '@style'
import { signOut } from '../../util/auth'
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

const Dashboard = () => (
  <Wrapper>
    <Text as="h1">Your Habits</Text>
    <Card>
        <Flex flexDirection="column">
            <Title>Run or Exercise</Title>
            <Motivation>to live a healthier life</Motivation>    
        </Flex>
    </Card>
    {firebase.auth().currentUser !== null
      ? `Hello ${firebase.auth().currentUser.displayName}`
      : ''}
    <SecondaryButton width="100%" onClick={signOut}>
      Sign Out
    </SecondaryButton>
  </Wrapper>
)
export default Dashboard
