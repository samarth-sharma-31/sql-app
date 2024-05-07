import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppThemeContextProvider } from "./context/AppThemeContext";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppThemeContextProvider>
      <App />
    </AppThemeContextProvider>
  </React.StrictMode>
);
