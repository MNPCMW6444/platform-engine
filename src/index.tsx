import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//import { from, Observable } from "rxjs";
//import { epoch, fft, powerByBand } from "@neurosity/pipes";
//import { FrequencyBands } from "./constants";
//import { FrequencyRangeInHz } from "./types";

let x;

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App x={x} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
