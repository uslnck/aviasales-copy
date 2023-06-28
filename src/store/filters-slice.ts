import { createSlice } from "@reduxjs/toolkit";
import { IFiltersSliceState } from "../types";

const initialState: IFiltersSliceState = {
  selectedFilter: "cheapest",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.selectedFilter = action.payload.filter;
    },
  },
});

export const { setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
