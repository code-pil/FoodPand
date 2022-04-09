import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ModalContextProvider } from "./context/show-hide-cart";

ReactDOM.render(
  <ModalContextProvider>
    <App />
  </ModalContextProvider>,
  document.getElementById("root")
);
reportWebVitals();
