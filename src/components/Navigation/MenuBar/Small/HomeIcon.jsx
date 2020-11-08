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
    width={size}
    height={size}
    viewBox="0 0 64 64"
    enableBackground="new 0 0 64 64"
    xmlSpace="preserve"
  >
    <path
      fill={color}
      d="M63.42,30.568c0,0-20.002-20.004-20.039-20.039l-9.955-9.955c-0.391-0.391-0.902-0.586-1.414-0.586
	s-1.023,0.195-1.414,0.586l-8.602,9.436V6.011c0-1.105-0.895-2-2-2h-7.998c-1.105,0-2,0.895-2,2v15.997l-9.432,9.998
	c-0.781,0.783-0.742,2.008,0.039,2.788c0.783,0.783,1.927,0.9,2.71,0.117l2.683-2.905v27.995c0,2.208,1.791,3.999,4,3.999H53.99
	c2.209,0,3.999-1.791,3.999-3.999V30.793l2.635,2.635c0.781,0.781,1.974,0.711,2.757-0.07C64.162,32.576,64.203,31.35,63.42,30.568z
	 M17.997,8.01v5.999l-4,4V8.01H17.997z M35.993,60.001h-7.998V44.004h7.998V60.001z M53.99,58.001c0,1.105-0.895,2-2,2H39.993
	V42.004c0-1.105-0.895-2-2-2H25.995c-1.104,0-1.999,0.895-1.999,2v17.997H11.998c-1.105,0-2-0.895-2-2V28.007L32.012,4.817
	L53.99,26.794V58.001z"
    />
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
