import { useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

import "~/styles/output.css";

import useOnlineStatus from "~/utils/hooks/useOnlineStatus";
import useApiStatus from "~/utils/hooks/useApiStatus";
import useCheckUserAuth from "~/utils/hooks/useCheckUserAuth";
import { useAppSelector } from "~/utils/hooks/redux.hooks";

import Landing from "~/layouts/Landing";
import Dashboard from "~/layouts/Dashboard";
import {
  UnderMaintenance,
  NoInternet,
} from "~/pages/public/public.pages.barrel";
import { CloseBtn } from "~/components/components.barrel";

function App() {
  // ? Redux States
  const theme = useAppSelector((state) => state.theme.mode);
  const userState = useAppSelector((state) => state.user);

  const isUserOnline = useOnlineStatus();
  const apiStatus = useApiStatus();
  const checkAuth = useCheckUserAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isUserOnline) {
    if (apiStatus) {
      return (
        <section
          aria-label="App"
          className={`${theme} transition-colors ease-soft-spring`}
        >
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={"dark"}
            closeButton={CloseBtn}
            limit={4}
          />
          {userState.authStatus === "loading" && (
            <Spinner
              label="Loading Please Wait"
              color="primary"
              labelColor="primary"
              className="w-screen h-screen"
            />
          )}
          {userState.authStatus === "unauthenticated" && <Landing />}
          {userState.authStatus === "authenticated" && <Dashboard />}
        </section>
      );
    } else {
      return <UnderMaintenance />;
    }
  } else {
    return <NoInternet />;
  }
}

export default App;
