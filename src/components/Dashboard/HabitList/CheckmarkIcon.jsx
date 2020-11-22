import React from 'react'
import PropTypes from 'prop-types'
import { motion, useMotionValue, useTransform } from 'framer-motion'
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled'

const SvgCanvas = styled(motion.svg)`
  width: 29px;
  height: 29px;
`

const CheckMarkCircle = styled.div(props => ({
  cursor: 'pointer',
  borderRadius: '30px',
  background: props.theme.colors.gray[200],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: `all .2s ease-out`,
  width: ['45px', '50px', '50px'],
  height: ['45px', '50px', '50px'],
}))

const CheckMark = styled(motion.path)(props => ({
  stroke: props.theme.colors.gray[900],
  fill: 'transparent',
  strokeWidth: 65,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}))

const tickVariants = {
  pressed: isChecked => ({ pathLength: isChecked ? 0.85 : 0.2 }),
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
}

const CheckmarkIcon = ({ isChecked }) => {
  const pathLength = useMotionValue(0)
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1])

  return (
    <CheckMarkCircle>
      <SvgCanvas
        animate={isChecked ? 'checked' : 'unchecked'}
        viewBox="0 0 440 440"
      >
        <CheckMark
          d="M 0 128.666 L 128.658 257.373 L 341.808 0"
          transform="translate(54.917 68.947) rotate(2 170.904 128.687)"
          fill="transparent"
          variants={tickVariants}
          style={{ pathLength, opacity }}
          custom={isChecked}
        />
      </SvgCanvas>
    </CheckMarkCircle>
  )
}

CheckmarkIcon.propTypes = {
  isChecked: PropTypes.bool.isRequired,
}
export { CheckmarkIcon }
