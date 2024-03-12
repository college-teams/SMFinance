import { ConfirmationModalProps } from "@/components/ConfirmModal";
import { useState } from "react";

export function useConfirmModal(): [
  ConfirmationModalProps,
  (message?: string) => Promise<boolean>
] {
  const outOfModalWarning = () =>
    console.warn("The use of this function outside of a modal is invalid.");

  const [props, setProps] = useState<ConfirmationModalProps>({
    ok: outOfModalWarning,
    cancel: outOfModalWarning,
    show: false,
    title: "",
    message: "",
  });

  const generatePromise = async (message?: string): Promise<boolean> =>
    new Promise<boolean>((resolve) => {
      const newProps = {
        ...props,
        show: true,
        ok(): void {
          resolve(true);
        },
        cancel(): void {
          resolve(false);
        },
      };

      if (typeof message !== "undefined") {
        newProps.message = message;
      }
      setProps(newProps);
    }).then((value) => {
      setProps({
        ...props,
        show: false,
        ok: outOfModalWarning,
        cancel: outOfModalWarning,
      });
      return value;
    });

  return [props, generatePromise];
}
