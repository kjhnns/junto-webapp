import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Typography'
import checkedIcon from './checked.svg'
import uncheckedIcon from './unchecked.svg'

const Card = ({ title, checked, handleClick }) => {
  return (
    <Flex
      sx={{
        border: '3px #000 solid',
        borderRadius: 'default',
        px: 4,
        minHeight: '93px',
        flex: '1',
        m: 2,
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
          <img
            width="32px"
            height="32px"
            src={checked ? checkedIcon : uncheckedIcon}
            alt=""
          />
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
