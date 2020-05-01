import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link as ReachLink } from '@reach/router'
import { Link as RebassLink } from 'rebass'

const AppLink = props => <RebassLink {...props} as={ReachLink} />

export { AppLink }
