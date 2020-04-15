import React from 'react'
import { Text } from '@components/Text'
import { SecondaryButton } from '@components/Button'
import Wrapper from './Wrapper'
import { signOut } from '../../util/auth'

import Habits from './Habits'

const Dashboard = () => {
  return (
    <Wrapper>
      <Text as="h1">Your Habits</Text>
      <Habits />
      <SecondaryButton width="100%" onClick={signOut}>
        Sign Out
      </SecondaryButton>
    </Wrapper>
  )
}
export default Dashboard
