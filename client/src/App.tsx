import "~/styles/output.css";

import { Spinner } from "@nextui-org/react";
import Landing from "~/layouts/Landing";
import Dashboard from "~/layouts/Dashboard";

function App() {
  const userStatus = "authenticated" as
    | "unauthenticated"
    | "loading"
    | "authenticated";

  return (
    <section className="dark">
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
