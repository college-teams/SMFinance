import { Backdrop, ModalWrapper } from "./styled";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  content: JSX.Element;
}

const Modal = ({ open, content }: ModalProps) => {
  const modalContent = (
    <ModalWrapper>
      <Backdrop />
      {content}
    </ModalWrapper>
  );

  return open ? ReactDOM.createPortal(modalContent, document.body) : null;
};

export default Modal;
