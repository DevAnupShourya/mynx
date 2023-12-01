import "~/styles/output.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

import { MdOutlineSignalWifiConnectedNoInternet4 } from "react-icons/md";
import { TbPlugConnected } from "react-icons/tb";

import { Spinner } from "@nextui-org/react";
import Landing from "~/layouts/Landing";
import Dashboard from "~/layouts/Dashboard";

import { updateUserData } from "~/context/user/userSlice";
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
        const response = await axios.get(`${API_URL}`);

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

    console.log(":::::::::::::::::");
    console.log(apiStatus);
    console.log(":::::::::::::::::");

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
          {userState.authStatus === "loading" ? (
            <Spinner
              label="Loading Please Wait"
              color="primary"
              labelColor="primary"
              className="w-screen h-screen"
            />
          ) : userState.authStatus === "unauthenticated" ? (
            <Landing />
          ) : (
            <Dashboard />
          )}
        </section>
      );
    } else {
      return (
        <section className="w-screen h-screen bg-main-text-default bg-yellow-200">
          <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
            <div className="flex flex-col items-center max-w-sm mx-auto text-center">
              <p className="p-3  font-medium rounded-full bg-yellow-500 text-white text-5xl">
                <TbPlugConnected />
              </p>
              <h1 className="mt-3 text-2xl font-semibold md:text-3xl capitalize">
                Under Maintenance
              </h1>
              <p className="mt-4">
                We're currently performing maintenance.
                <br />
                Please check back later..
              </p>
            </div>
          </div>
        </section>
      );
    }
  } else {
    return (
      <section className="w-screen h-screen bg-main-text-default bg-red-200">
        <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <p className="p-3  font-medium rounded-full bg-red-500 text-white text-5xl">
              <MdOutlineSignalWifiConnectedNoInternet4 />
            </p>
            <h1 className="mt-3 text-2xl font-semibold md:text-3xl capitalize">
              No Internet
            </h1>
            <p className="mt-4">Check your internet connection.</p>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
