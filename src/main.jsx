import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Loading from "./Loading/Loading.jsx";
import "./index.css";
import { DateProvider } from "./DateContext.jsx";
import { ItemProvider } from "./ItemContext.jsx";
import { StyledEngineProvider } from "@mui/material";

const App = lazy(() => import("./App.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DateProvider>
      <StyledEngineProvider injectFirst>
        <ItemProvider>
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        </ItemProvider>
      </StyledEngineProvider>
    </DateProvider>
  </React.StrictMode>
);
