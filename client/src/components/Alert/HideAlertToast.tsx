import { useEffect } from "react";

// ? Redux
import { useAppSelector, useAppDispatch } from "~/utils/hooks/redux.hooks";
import { showAlert } from "~/context/alert/alertSlice";

export default function HideAlertToast() {
  const notification = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // ? Hide The Notification Toast
    if (notification.show) {
      const hideAlertAfterFiveSeconds = setTimeout(() => {
        dispatch(showAlert({ show: false, type: null, msg: null }));
      }, 5000);

      return () => {
        clearTimeout(hideAlertAfterFiveSeconds);
      };
    }
  }, [notification.show, dispatch]);

  return <></>;
}
