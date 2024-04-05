import styled, { keyframes } from "styled-components";
import { IoMdClose } from "react-icons/io";

export const Wrapper = styled.div`
  position: fixed;
  left: 0%;
  top: 10%;
  z-index: 1000;
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

export const DetailsContainer = styled.div`
  position: relative;
  background: #fff;
  color: #000;
  width: auto;
  /* height: 80vh; */
  overflow-y: overlay;
  overflow-x: overlay;
  border-radius: 2px;
  padding: 1.3rem 2rem;
  opacity: 0;
  animation: ${OpacityAnimation} 0.5s ease-in-out forwards;

  & > * {
    height: inherit;
    align-self: stretch;
  }
/* 
  @media screen and (max-width: 500px) {
    height: 50vh;
      } */
`;

export const CloseIcon = styled(IoMdClose)`
  position: fixed;
  right: 30%;
  top: 10%;
  font-size: 2rem;
  cursor: pointer;
  color: #f2f2f2;
  z-index: 1000;
  background-color: #fff;
  color: #000;
  height: 2.5rem;
  width: 2.5rem;
  opacity:1;
  border-radius: 4px;

  &:hover {
    opacity: 1;
    transition: 0.2s;
  }

  @media screen and (max-width: 800px) {
    right: 10%
  }

  @media screen and (max-width: 500px) {
    right: 10px
  }
`;
