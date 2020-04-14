import styled from '@style'

const Container = styled.div`
  display: none;
  position: relative;
  bottom: 0;
  width: 100%;
  z-index: 50;
  background: #fff;
  border-top: 1px solid #cfcfcf;
  box-sizing: border-box;

  /* Layout Adjustments for iPhone X and XR */
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);

  @media (max-width: 799px) {
    display: flex;
  }
`

export default Container
