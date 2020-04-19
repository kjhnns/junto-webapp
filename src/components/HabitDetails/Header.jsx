import React from 'react'
import PropTypes from 'prop-types'

import { Heading, Text } from '@components/Typography'
import { Box, Flex } from '@components/Grid'
import { Link } from '@components/Link'

const Header = ({ title }) => {
  return (
    <Box
      sx={{
        bg: 'gray.900',
        width: '100%',
      }}
    >
      <Flex
        sx={{
          maxWidth: '800px',
          m: 'auto',
          p: 3,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'top',
        }}
      >
        <Flex sx={{ pt: 4, flexDirection: 'column' }}>
          <Text
            sx={{
              color: 'white',
              textTransform: 'uppercase',
              fontWeigth: 600,
            }}
          >
            Your Habit
          </Text>
          <Heading sx={{ color: 'white', pt: 3 }}>{`${title}`}</Heading>
        </Flex>
        <Link sx={{ color: 'white', fontWeight: '600' }} to="/dashboard">
          close
        </Link>
      </Flex>
    </Box>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export { Header }
