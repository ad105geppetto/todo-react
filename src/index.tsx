import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Layout from "./layout";
import { GlobalStyles } from "./globalStyle";
import { GlobalProvider } from "./context/globalContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <>
        <GlobalStyles />
        <Layout>
          <App />
        </Layout>
      </>
    </GlobalProvider>
  </React.StrictMode>
);
