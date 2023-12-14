import { Card, CardHeader, CardBody, Button, Divider } from "@nextui-org/react";

import { RiCheckboxCircleFill } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { BiSolidErrorAlt } from "react-icons/bi";
import { BiError } from "react-icons/bi";

// ? Redux
import { useAppSelector, useAppDispatch } from "~/utils/hooks/redux.hooks";
import { showAlert } from "~/redux/alert/alertSlice";

import HideAlertToast from "~/components/Alert/HideAlertToast";

export default function AlertToast() {
  const notification = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  if (notification.show === false) {
    return null;
  }

  const hideAlert = () => {
    dispatch(showAlert({ show: false, type: null, msg: null }));
  };

  return (
    <aside key={notification.msg}>
      <HideAlertToast />
      <div
        className={`fixed bottom-2 left-0 max-md:bottom-16 z-50 w-screen px-2 grid max-md:place-items-center transition-all`}
      >
        <Card
          radius="lg"
          shadow="lg"
          className={`bg-all max-w-md max-md:w-11/12`}
        >
          <CardHeader className="justify-between">
            <Button
              type="button"
              color={
                notification.type === "danger"
                  ? "danger"
                  : notification.type === "success"
                  ? "success"
                  : notification.type === "warning"
                  ? "warning"
                  : "default"
              }
              isIconOnly
              variant="flat"
              className="cursor-default"
              size="md"
            >
              {notification.type === "danger" ? (
                <BiSolidErrorAlt />
              ) : notification.type === "success" ? (
                <RiCheckboxCircleFill />
              ) : notification.type === "warning" ? (
                <MdErrorOutline />
              ) : (
                <BiError />
              )}
            </Button>
            <Button
              type="button"
              color="danger"
              isIconOnly
              variant="light"
              aria-label="Close"
              size="md"
              onClick={hideAlert}
            >
              <AiFillCloseCircle />
            </Button>
          </CardHeader>
          <Divider />
          <CardBody className="text-base capitalize tracking-tighter 37/100">
            {/* {notification.msg?.trim().slice(0, 101)}. */}
            {notification.msg}.
          </CardBody>
        </Card>
      </div>
    </aside>
  );
}
