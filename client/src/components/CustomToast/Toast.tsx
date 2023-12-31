import { toast as reactToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { PiShieldWarningBold } from "react-icons/pi";
import { BiMessageSquareError } from "react-icons/bi";
import { TbAlertOctagon, TbAlertHexagon } from "react-icons/tb";

type ToastTypes = "error" | "loading" | "success" | "warning" | "info";

class Toast {
  private static instance: Toast;

  private constructor() {}

  private static getInstance(): Toast {
    if (!Toast.instance) {
      Toast.instance = new Toast();
    }
    return Toast.instance;
  }

  private showToast(type: ToastTypes, message: string, options?: object): void {
    let Icon;

    switch (type) {
      case "success":
        Icon = <IoCheckmarkDoneSharp />;
        break;
      case "warning":
        Icon = <PiShieldWarningBold />;
        break;
      case "error":
        Icon = <BiMessageSquareError />;
        break;
      case "info":
        Icon = <TbAlertHexagon />;
        break;
      default:
        Icon = <TbAlertOctagon />;
    }

    reactToast[type](message, {
      icon: Icon,
      ...options,
    });
  }

  public static info(message: string, options?: object): void {
    Toast.getInstance().showToast("info", message, options);
  }

  public static success(message: string, options?: object): void {
    Toast.getInstance().showToast("success", message, options);
  }

  public static warning(message: string, options?: object): void {
    Toast.getInstance().showToast("warning", message, options);
  }

  public static error(message: string, options?: object): void {
    Toast.getInstance().showToast("error", message, options);
  }

  public static showToast(
    type: ToastTypes,
    message: string,
    options?: object
  ): void {
    Toast.getInstance().showToast(type, message, options);
  }
}

export default Toast;
