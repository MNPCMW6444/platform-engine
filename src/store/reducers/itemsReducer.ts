import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EEGReading, EEGReading as MuseChannelReading } from "muse-js";

type MuseReading = {
  index: number;
  timestamp: number;
  samples: { TP9: number; AF7: number; AF8: number; TP10: number };
};

export type MuseState = {
  museReadings: MuseReading[];
};

const initialState: MuseState = {
  museReadings: [],
};

export const museSlice = createSlice({
  name: "muse",
  initialState,
  reducers: {
    addChannelSample: (
      state: MuseState,
      action: PayloadAction<MuseChannelReading>
    ) => {
      const existing = state.museReadings.filter(
        (reading) => reading.index === action.payload.index
      );
      let res = existing.length > 0 ? existing[0] : ({} as MuseReading);
      res.index = action.payload.index;
      res.timestamp = action.payload.timestamp;
      /// res.samples.AF7=action.payload.samples
    },
  },
});

export const { addChannelSample } = museSlice.actions;

export const actions = museSlice.actions;

export default museSlice.reducer;
