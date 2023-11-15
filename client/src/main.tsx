import React from "react";
import ReactDOM from "react-dom/client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import reduxStore from "~/context/redux.store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(reduxStore);

import App from "./App.tsx";
import { Spinner } from "@nextui-org/spinner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <NextUIProvider>
        <PersistGate
          loading={
            <div className="w-screen h-screen bg-main-text-main grid place-items-center">
              <main className="text-center">
                <Spinner
                  label="Hold On...."
                  color="warning"
                  labelColor="warning"
                  className="mb-5"
                />
              </main>
            </div>
          }
          persistor={persistor}
        >
          <App />
        </PersistGate>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);
