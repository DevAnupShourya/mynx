import "~/styles/output.css";

import { Spinner } from "@nextui-org/react";
import Landing from "~/layouts/Landing";
import Dashboard from "~/layouts/Dashboard";

import { useAppSelector } from "~/utils/hooks/redux.hooks";

function App() {
  const userStatus = "authenticated" as
    | "unauthenticated"
    | "loading"
    | "authenticated";

  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <section className={theme}>
      {userStatus === "loading" ? (
        <Spinner
          label="Loading Plese Wait"
          color="primary"
          labelColor="primary"
          className="w-screen h-screen"
        />
      ) : userStatus === "unauthenticated" ? (
        <Landing />
      ) : (
        <Dashboard />
      )}
    </section>
  );
}

export default App;
