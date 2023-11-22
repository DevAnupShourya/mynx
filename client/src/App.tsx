import "~/styles/output.css";
import { useEffect } from "react";

import { Spinner } from "@nextui-org/react";
import Landing from "~/layouts/Landing";
import Dashboard from "~/layouts/Dashboard";

import auth from "~/firebase";

import { updateUserData } from "~/context/user/userSlice";
import { useAppDispatch, useAppSelector } from "~/utils/hooks/redux.hooks";
import AlertToast from "~/components/Alert/AlertToast";
import { getUserByUID } from "~/services/Auth/Authentication.services";

function App() {
  // ? Redux States
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const userState = useAppSelector((state) => state.user);

  // TODO : Check User is Connected with Internet or Not and show page according to that
  // TODO : Check Our API is Live and responding or Not and show page according to that

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const { data } = await getUserByUID(authUser.uid);

        // ? After Getting user data from db set it as state
        dispatch(
          updateUserData({
            userId: authUser.uid,
            name: data.responseData.user.name!,
            mail: authUser.email!,
            username: data.responseData.user.username!,
            dateJoined: data.responseData.user.createdAt!,
            userImg: data.responseData.user.avatarURL!,
            authStatus: "authenticated",
          })
        );
      } else {
        dispatch(
          updateUserData({
            ...userState,
            authStatus: "unauthenticated",
          })
        );
        console.warn("No User Logged In....");
      }
    });

    return () => unsubscribe();
  }, [dispatch, userState]);

  return (
    <section aria-label="App" className={`${theme}`}>
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
}

export default App;
