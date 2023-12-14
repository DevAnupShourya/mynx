import "~/styles/output.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axiosInstance from "~/lib/AxiosInstance";

import { Spinner } from "@nextui-org/react";
import Landing from "~/layouts/Landing";
import Dashboard from "~/layouts/Dashboard";
import {
  UnderMaintenance,
  NoInternet,
} from "~/pages/public/public.pages.barrel";

import { updateUserData } from "~/redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "~/utils/hooks/redux.hooks";
import AlertToast from "~/components/Alert/AlertToast";
import { getCurrentUser } from "~/services/Auth/Authentication.services";

function App() {
  // ? Redux States
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const userState = useAppSelector((state) => state.user);

  const [cookies] = useCookies();

  const [isUserOnline, setUserIsOnline] = useState(navigator.onLine);
  const [apiStatus, setApiStatus] = useState(false);

  useEffect(() => {
    // ? Checking user Authentication status
    async function checkAuth() {
      try {
        if (!cookies["secret_text"]) {
          console.warn("No Token Found!");
          dispatch(
            updateUserData({ ...userState, authStatus: "unauthenticated" })
          );
        } else {
          const userDataFromServer = await getCurrentUser(
            cookies["secret_text"] as string
          );

          dispatch(
            updateUserData({
              authStatus: "authenticated",
              mail: userDataFromServer.email,
              name: userDataFromServer.name,
              userImg: userDataFromServer.avatarURL,
              username: userDataFromServer.username,
            })
          );
        }
      } catch (error) {
        console.error("Error fetching user Authentication:", error);
      }
    }

    const checkApiStatus = async () => {
      try {
        const response = await axiosInstance.get(`/`);

        if (response.status === 200) {
          setApiStatus(true);
        } else {
          setApiStatus(false);
        }
      } catch (error) {
        console.error("Error checking API status:", error);
        setApiStatus(false);
      }
    };

    const handleOnline = () => setUserIsOnline(true);
    const handleOffline = () => setUserIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    checkApiStatus();
    checkAuth();

    return () => {
      checkApiStatus();
      checkAuth();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [cookies, dispatch, userState, apiStatus]);

  if (isUserOnline) {
    if (apiStatus) {
      return (
        <section
          aria-label="App"
          className={`${theme} transition-colors ease-soft-spring`}
        >
          <AlertToast />
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
