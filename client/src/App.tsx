import "~/styles/output.css";
import "~/styles/globals.css";

import { Spinner } from "@nextui-org/react";
import Landing from "~/layouts/Landing";
import Dashboard from "~/layouts/Dashboard";

function App() {
  const userStatus = "authenticated" as
    | "unauthenticated"
    | "loading"
    | "authenticated";

  return userStatus === "loading" ? (
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
  );
}

export default App;
