import React from 'react'
import firebase from 'gatsby-plugin-firebase'
import { SecondaryButton } from '@components/Button'
import { signOut } from '../../util/auth'
import Wrapper from './Wrapper'

const Dashboard = () => (
  <Wrapper>
    {firebase.auth().currentUser !== null
      ? `Hello ${firebase.auth().currentUser.displayName}`
      : ''}
    <SecondaryButton width="100%" onClick={signOut}>
      Sign Out
    </SecondaryButton>
  </Wrapper>
)
export default Dashboard
