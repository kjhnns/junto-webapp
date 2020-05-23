// stylelint-disable
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled'
// eslint-disable-next-line import/no-extraneous-dependencies
import { keyframes } from '@emotion/core'
import { Box } from '@components/Grid'

const Shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
`

const Wrapper = styled.div`
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${Shimmer};
  animation-timing-function: linear;
  background: ${props =>
    props.light ? props.theme.colors.gray[600] : props.theme.colors.gray[800]};
  background: linear-gradient(
    to right,
    ${props =>
        props.light
          ? props.theme.colors.gray[300]
          : props.theme.colors.gray[600]}
      8%,
    ${props =>
        props.light
          ? props.theme.colors.gray[600]
          : props.theme.colors.gray[800]}
      18%,
    ${props =>
        props.light
          ? props.theme.colors.gray[300]
          : props.theme.colors.gray[600]}
      33%
  );
  background-size: 800px 104px;
  position: relative;
  width: 100%;
  height: 30px;
`

const Placeholder = props => (
  <Box {...props}>
    <Wrapper> </Wrapper>
  </Box>
)

const PlaceholderLight = props => (
  <Box {...props}>
    <Wrapper light> </Wrapper>
  </Box>
)

export { Placeholder, PlaceholderLight }
