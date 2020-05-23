import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled'
// eslint-disable-next-line import/no-extraneous-dependencies
import { keyframes } from '@emotion/core'

const SvgCanvas = styled.svg`
  width: 29px;
  height: 22px;
`

const StrokeDraw = keyframes`
  0% {
    stroke: #000;
    fill: #000;
  }

  100% {
    stroke: #000;
    fill: #000;
    stroke-width: 3;
  }
`

const CheckMark = styled.path`
  stroke: none;
  fill: none;
  stroke-width: 0;
  animation: ${StrokeDraw} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0s forwards;
`

const CheckmarkIcon = () => (
  <SvgCanvas viewBox="0 0 29 22">
    <CheckMark d="M25.4387 2.30041L11.7168 17.7374L3.45009 11.1242C3.06617 10.8162 2.5028 10.8796 2.19566 11.2635C1.88764 11.6492 1.95014 12.2108 2.33494 12.5188L11.2632 19.6615C11.4275 19.7927 11.6248 19.857 11.8213 19.857C12.0677 19.857 12.3132 19.7552 12.4891 19.557L26.7744 3.48609C27.102 3.11825 27.069 2.55308 26.7003 2.22631C26.3306 1.89775 25.7672 1.93078 25.4387 2.30041Z" />
  </SvgCanvas>
)

export { CheckmarkIcon }
