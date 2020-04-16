import styled from '@style'

const Container = styled.div`
  display: flex;
  width: 100%;
  z-index: 50;
  background: #fff;
  border-bottom: 1px solid #cfcfcf;
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);

  /* Layout Adjustments for iPhone X and XR */
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
`

export default Container
