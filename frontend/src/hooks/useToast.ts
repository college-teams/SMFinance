import { toast } from "react-hot-toast";
import { NotificationType } from "../types/NotificationType";

const useToast = () => {
  const showToast = (
    message: string,
    type: NotificationType,
    duration: number = 2000
  ) => {
    switch (type) {
      case "success":
        toast.success(message, {
          className: "relative font-semibold text-[1.4rem]",
          duration,
        });
        break;
      case "error":
        toast.error(message, {
          className: "relative font-semibold text-[1.4rem]",
        });
        break;
      default:
        toast(message, {
          className: "relative font-semibold text-[1.4rem]",
        });
    }
  };

  return showToast;
};

export default useToast;
