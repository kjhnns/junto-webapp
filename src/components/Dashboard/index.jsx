import React from 'react'
import { Text } from '@components/Typography'
import { Button } from '@components/Button'
import Wrapper from './Wrapper'
import { signOut } from '../../util/auth'

import Habits from './Habits'
import Calendar from './Calendar'

const Dashboard = () => {
  return (
    <Wrapper>
      <Text as="h1">Your Habits</Text>
      <Calendar />
      <Habits />
      <Button width="100%" onClick={signOut}>
        Sign Out
      </Button>
    </Wrapper>
  )
}
export default Dashboard
