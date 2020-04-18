import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import { CheckmarkIcon } from './CheckmarkIcon'

const Card = ({ title, checked, handleClick }) => {
  return (
    <Flex
      sx={{
        bg: 'gray.400',
        borderRadius: 'default',
        px: 4,
        minHeight: '93px',
        flex: '1',
      }}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flex="1"
      >
        <Flex alignItems="flex-start" flexDirection="column" flex="1">
          <Text as="h2">{title}</Text>
        </Flex>
        <Box onClick={handleClick}>
          <Box
            sx={{
              cursor: 'pointer',
              borderRadius: '30px',
              bg: 'gray.200',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {checked ? <CheckmarkIcon /> : ''}
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default Card