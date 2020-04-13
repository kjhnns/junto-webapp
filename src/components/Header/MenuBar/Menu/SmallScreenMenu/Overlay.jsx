import styled from '@style'

const Overlay = styled.div`
  position: relative;
  padding: 0;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 99;
`

export default Overlay
