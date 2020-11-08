import React from 'react'
import { Box } from '@components/Grid'
import SettingsImage from './Settings.svg'

const SettingsIcon = () => (
  <Box
    sx={{
      minHeight: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    }}
  >
    <Box p={0} m={0} height="35px">
      <img
        height="35px"
        src={SettingsImage}
        alt="junto - social habit tracking"
      />
    </Box>
  </Box>
)

export { SettingsIcon }