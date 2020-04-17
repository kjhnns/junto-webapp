import React from 'react'
import { Text } from '@components/Typography'
import { Button } from '@components/Button'
import Wrapper from './Wrapper'
import { signOut } from '../../util/auth'

import Habits from './Habits'

const Dashboard = () => {
  return (
    <Wrapper>
      <Text as="h1">Your Habits</Text>
      <Habits />
      <Button width="100%" onClick={signOut}>
        Sign Out
      </Button>
    </Wrapper>
  )
}
export { Dashboard }
