import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@components/Grid'

const HomeImage = ({ color, size }) => (
  <svg
    version="1.0"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 699 699"
    fill="none"
    enableBackground="new 0 0 699 699"
    xmlSpace="preserve"
    width={size}
    height={size}
  >
    <path
      d="M314.639 494C324.096 494 333.603 490.079 340.402 482.427L526.284 273.345C538.934 259.141 537.673 237.336 523.42 224.697C509.188 212.064 487.436 213.34 474.784 227.571L310.616 412.228C310.616 412.228 255.359 368.077 219.99 339.741L219.965 339.721C205.087 327.809 183.394 330.293 171.548 345.098L171.536 345.113C159.674 359.964 162.071 381.629 176.926 393.519L293.126 486.463C299.454 491.517 307.091 494 314.639 494Z"
      fill={color}
    />
    <circle cx="349.5" cy="349.5" r="325.5" stroke={color} strokeWidth="48" />
  </svg>
)

HomeImage.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
}

const HomeIcon = ({ color }) => (
  <Box
    sx={{
      minHeight: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    }}
  >
    <Box p={0} m={0}>
      <HomeImage color={color} size="25px" />
    </Box>
  </Box>
)

HomeIcon.propTypes = {
  color: PropTypes.string.isRequired,
}

export { HomeIcon }
