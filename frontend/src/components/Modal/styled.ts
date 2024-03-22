import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const Backdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 500;
  
`;
