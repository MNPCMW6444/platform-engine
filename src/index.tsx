import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { from, Observable } from "rxjs";
import { epoch, fft, powerByBand } from "@neurosity/pipes";
import { FrequencyBands } from "./constants";
import { FrequencyRangeInHz } from "./types";

const container = document.getElementById("root")!;
const root = createRoot(container);

const state$ = from(store);

type StoreType = typeof store;

function getState$(store: StoreType) {
  return new Observable(function (observer) {
    // emit the current state as first value:
    observer.next(
      store.getState().muse.museReadings[
        store.getState().muse.museReadings.length - 1
      ]
    );
    const unsubscribe = store.subscribe(function () {
      // emit on every new state changes
      observer.next(
        store.getState().muse.museReadings[
          store.getState().muse.museReadings.length - 1
        ]
      );
    });
    // let's return the function that will be called
    // when the Observable is unsubscribed
    return unsubscribe;
  });
}
const freqnames = Object.keys(FrequencyBands);
const freqrange: FrequencyRangeInHz[] = Object.values(FrequencyBands);

const frequencyBands = {} as any;

freqnames.forEach((freqname: string, index: number) => {
  frequencyBands[freqname] = [
    freqrange[index].minFrequencyiInHz,
    freqrange[index].maxFrequencyiInHz,
  ];
});

getState$(store)
  .pipe(
    epoch({ duration: 256, interval: 100 }),
    fft({ bins: 256 }),
    powerByBand(frequencyBands)
  )
  .subscribe((x) => {
    console.log(x);
  });

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
