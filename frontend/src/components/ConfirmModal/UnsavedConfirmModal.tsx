import { ConfirmationModal, ConfirmationModalProps } from ".";

export const UnsavedConfirmModal = (props: ConfirmationModalProps) => (
  <ConfirmationModal
    {...props}
    message="This form has unsaved data. Are you sure you want to cancel ?"
  />
);
