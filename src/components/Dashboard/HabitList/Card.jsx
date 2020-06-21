import React from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled'
import { Flex, Box } from '@components/Grid'
import { Link } from '@components/Link'
import { Text } from '@components/Typography'
import { CheckmarkIcon } from './CheckmarkIcon'

const CheckMarkCircle = styled(Box)(props => ({
  cursor: 'pointer',
  borderRadius: '30px',
  background: props.theme.colors.gray[200],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: `all .2s ease-out`,
}))

const Card = ({ title, streak, linkTo, checked, handleClick }) => {
  return (
    <Flex
      sx={{
        bg: 'gray.400',
        borderRadius: 'default',
        px: [3, 4, 4],
        minHeight: ['80px', '93px', '93px'],
        flex: '1',
      }}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flex="1"
      >
        <Flex alignItems="center" flexDirection="row" flex="1">
          <Link flex="1" sx={{ textDecoration: 'none' }} to={`${linkTo}`}>
            <Text as="h2" sx={{ fontSize: [3, 4, 4] }}>
              {title}
            </Text>
          </Link>
          {streak > 0 ? (
            <Box justifyContent="center">
              <Text as="h3">{streak}</Text>
            </Box>
          ) : (
            ''
          )}
        </Flex>
        <Box onClick={handleClick} ml={3}>
          {checked ? (
            <CheckMarkCircle
              sx={{
                width: ['45px', '50px', '50px'],
                height: ['45px', '50px', '50px'],
              }}
              border
            >
              <CheckmarkIcon />
            </CheckMarkCircle>
          ) : (
            <CheckMarkCircle
              sx={{
                width: ['45px', '50px', '50px'],
                height: ['45px', '50px', '50px'],
              }}
            />
          )}
        </Box>
      </Flex>
    </Flex>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  streak: PropTypes.number.isRequired,
  linkTo: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default Card
