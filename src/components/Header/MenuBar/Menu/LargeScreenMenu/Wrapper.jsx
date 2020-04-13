import { Flex } from '@components/Grid'
import styled from '@style'

const LargeScreenMenu = styled(Flex)`
  display: none;
  flex: 0 0 auto;
  padding: 0 22px;
  align-items: center;
  justify-content: flex-end;
  min-height: 100%;

  @media (min-width: 800px) {
    display: flex;
  }
`

export default LargeScreenMenu
