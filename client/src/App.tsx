import "~/styles/output.css";
import { useEffect } from "react";

import { Spinner } from "@nextui-org/react";
import Landing from "~/layouts/Landing";
import Dashboard from "~/layouts/Dashboard";

import auth from "~/firebase";

import { updateUserData } from "~/context/user/userSlice";
import { useAppDispatch, useAppSelector } from "~/utils/hooks/redux.hooks";
import AlertToast from "~/components/Alert/AlertToast";

function App() {
  // ? Redux States
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        dispatch(
          updateUserData({
            userId : authUser.uid,
            name: authUser.displayName!,
            mail: authUser.email!,
            username: authUser.displayName!,
            dateJoined: authUser.metadata.creationTime!,
            userImg: authUser.photoURL!,
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
      <AlertToast/>
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
