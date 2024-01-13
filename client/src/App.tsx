import { useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import { Spinner } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

// ? Global Tailwind CSS Style
import "~/styles/output.css";

import useOnlineStatus from "~/utils/hooks/useOnlineStatus";
import useApiStatus from "~/utils/hooks/useApiStatus";
import useCheckUserAuth from "~/utils/hooks/useCheckUserAuth";
import { useAppSelector } from "~/utils/hooks/redux.hooks";

import Landing from "~/layouts/Landing";
import Dashboard from "~/layouts/Dashboard";
import UnderMaintenance from "~/pages/public/UnderMaintenance";
import NoInternet from "~/pages/public/NoInternet";
import CloseBtn from "~/components/custom_toast/CloseBtn";

function App() {
  // ? Redux States
  const themeState = useAppSelector((state) => state.theme.mode);
  const userState = useAppSelector((state) => state.user);

  // ? For that user is connected with Internet or not
  const isUserOnline = useOnlineStatus();
  // ? For that server is running or not
  const apiStatus = useApiStatus();
  // ? For checking the authentication status or user every time
  const checkAuth = useCheckUserAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isUserOnline) {
    if (apiStatus) {
      return (
        <section
          aria-label="App"
          className={`${themeState} transition-colors ease-soft-spring`}
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
            theme={themeState}
            closeButton={CloseBtn}
            limit={4}
          />
          {userState.authStatus === "loading" && (
            <Spinner
              data-testid="Loading"
              label="Loading Please Wait"
              color="primary"
              labelColor="primary"
              className="w-screen h-screen"
            />
          )}
          {userState.authStatus === "unauthenticated" && <Landing />}
          {userState.authStatus === "authenticated" && (
            <CookiesProvider>
              <Dashboard />
            </CookiesProvider>
          )}
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
