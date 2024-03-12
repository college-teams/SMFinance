import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  left: 0%;
  top: 5%;
  z-index: 10000;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const OpacityAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const ConfirmationContainer = styled.div`
  position: relative;
  background: var(--white-color);
  max-width: 500px;
  height: auto;
  max-height: 650px;
  overflow-y: overlay;
  overflow-x: hidden;
  border-radius: 4px;
  padding: 2rem 3rem;
  opacity: 0;
  animation: ${OpacityAnimation} 0.5s ease-in-out forwards;

  & > * {
    height: inherit;
    align-self: stretch;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2000;
`;
