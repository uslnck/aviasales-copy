import { createSlice } from "@reduxjs/toolkit";
import { ITicketsSliceState } from "../types";

const initialState: ITicketsSliceState = {
  displayCount: 5,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    increaseDisplayCount: (state) => {
      state.displayCount = state.displayCount + 5;
    },
  },
});

export const { increaseDisplayCount } = ticketsSlice.actions;

export default ticketsSlice.reducer;
