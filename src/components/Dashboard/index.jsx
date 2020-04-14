import React from 'react'
import firebase from 'gatsby-plugin-firebase'
import { SecondaryButton } from '@components/Button'
import { Text } from '@components/Text'
import styled from '@style'
import { signOut } from '../../util/auth'
import Wrapper from './Wrapper'

const Card = styled.div`
  display: flex;
`

const Dashboard = () => (
  <Wrapper>
    <Text as="h1">Your Habits</Text>
    <Card>asd</Card>
    {firebase.auth().currentUser !== null
      ? `Hello ${firebase.auth().currentUser.displayName}`
      : ''}
    <SecondaryButton width="100%" onClick={signOut}>
      Sign Out
    </SecondaryButton>
  </Wrapper>
)
export default Dashboard
