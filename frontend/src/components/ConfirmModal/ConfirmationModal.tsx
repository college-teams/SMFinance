import React from "react";
import { Backdrop, ConfirmationContainer, Wrapper } from "./styled";
import Modal from "../Modal";

export interface ConfirmationModalProps {
  ok: () => void;
  cancel: () => void;
  show: boolean;
  title?: string;
  message?: string;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const Content = (
    <React.Fragment>
      <Backdrop />
      <Wrapper>
        <ConfirmationContainer>
          <h2 className="relative mb-5 text-[2rem] font-semibold">
            Are you sure?
          </h2>
          <p className="relative text-[1.4rem] font-medium mb-8">
            {props.message}
          </p>

          <div className="relative flex gap-8">
            <button
              className="relative bg-white text-orange-500 px-8 py-2 rounded text-[1.3rem] border border-orange-500 hover:bg-orange-500 hover:text-white"
              onClick={props.cancel}
            >
              Cancel
            </button>
            <button
              className="relative bg-orange-500 text-white px-12 py-2 rounded text-[1.3rem] border border-orange-500 hover:bg-orange-600"
              onClick={props.ok}
            >
              OK
            </button>
          </div>
        </ConfirmationContainer>
      </Wrapper>
    </React.Fragment>
  );

  return <Modal open={props.show} content={Content} />;
};

export { ConfirmationModal };
