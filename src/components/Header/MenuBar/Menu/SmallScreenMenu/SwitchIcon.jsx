import React from 'react'
import PropTypes from 'prop-types'
import styled, { themeGet } from '@style'

const Wrapper = styled.a`
  position: absolute;
  right: 21px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &.icon > span:first-child {
    width: 21px;
    transition-delay: 0.31s;
  }

  &.icon > span:nth-child(2) {
    width: 21px;
    transition-delay: 0.5s;
  }

  &.icon > span:nth-child(3) {
    width: 21px;
    transition-delay: 0.5s;
  }

  &.icon > span:nth-child(4) {
    transform: rotate(45deg) scaleX(0);
    position: absolute;
    top: 90%;
    right: 0;
    width: 25px;
    transition-delay: 0.1s;
  }

  &.icon > span:nth-child(5) {
    transform: rotate(-45deg) scaleX(0);
    position: absolute;
    top: -10%;
    right: 0;
    width: 25px;
    transition-delay: 0.2s;
  }

  &.icon.active > span:first-child {
    transform: scaleX(0);
    transition-delay: 0.05s;
  }

  &.icon.active > span:nth-child(2) {
    transform: scaleX(0);
    transition-delay: 0.1s;
  }

  &.icon.active > span:nth-child(3) {
    transform: scaleX(0);
    transition-delay: 0.1s;
  }

  &.icon.active > span:nth-child(4) {
    transform: rotate(45deg) scaleX(1);
    transition-delay: 0.3s;
  }

  &.icon.active > span:nth-child(5) {
    transform: rotate(-45deg) scaleX(1);
    transition-delay: 0.2s;
  }
`

const Line = styled.span`
  display: block;
  clear: both;
  float: none;
  width: 16px;
  height: 2px;
  background: ${themeGet('colors.secondary.400')};
  margin: 2px 0;
  transform: scaleX(1);
  transform-origin: 100% 50%;
  transition: all 0.2s linear;
`

const SwitchIcon = ({ active }) => {
  const className = active ? 'icon active' : 'icon'
  return (
    <Wrapper className={className}>
      <Line />
      <Line />
      <Line />
      <Line />
      <Line />
    </Wrapper>
  )
}

SwitchIcon.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default SwitchIcon
