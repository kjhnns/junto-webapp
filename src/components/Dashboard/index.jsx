import React from 'react'
import { Text } from '@components/Text'
import Wrapper from './Wrapper'
import Card from './Card'

const Dashboard = () => {

  return (
    <Wrapper>
      <Text as="h1">Your Habits</Text>
      <Card title="Hallo Welt" id="asd-asd" checked="123" />
      <Card title="Run" motivation="to live a healthier live" id="asd-asd" />
      <Card
        title="Run"
        motivation="to live a healthier live"
        id="asd-asd"
        follower="12"
        checked="123"
      />
    </Wrapper>
  )
}
export default Dashboard
