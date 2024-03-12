import { NotificationType } from "@/types/NotificationType";
import { toast } from "react-hot-toast";

const useToast = () => {
  const showToast = (
    message: string,
    type: NotificationType,
    duration: number = 2000
  ) => {
    switch (type) {
      case "success":
        toast.success(message, {
          className: "relative font-semibold",
          duration,
        });
        break;
      case "error":
        toast.error(message, {
          className: "relative font-semibold",
        });
        break;
      default:
        toast(message, {
          className: "relative font-semibold",
        });
    }
  };

  return showToast;
};

export default useToast;
