import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ITicket, IFiltersSliceState } from "../types";

const initialState: IFiltersSliceState = {
  selectedFilter: "cheapest",
  filteredTickets: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ filter: string }>) => {
      state.selectedFilter = action.payload.filter;
    },
    setFilteredTickets: (state, action: PayloadAction<ITicket[]>) => {
      state.filteredTickets = action.payload;
    },
  },
});

export const applyFilters = createAsyncThunk<
  ITicket[],
  ITicket[],
  { state: RootState }
>("filters/applyFilters", async (tickets, { getState, dispatch }) => {
  const {
    zeroTransfersChecked,
    oneTransferChecked,
    twoTransfersChecked,
    allTransfersChecked,
  } = getState().checkboxes;

  const { selectedFilter } = getState().filters;

  let mutableTickets = [...tickets];

  const transferCount = zeroTransfersChecked
    ? 0
    : oneTransferChecked
    ? 1
    : twoTransfersChecked
    ? 2
    : 3;

  if (!allTransfersChecked) {
    mutableTickets = mutableTickets.filter(
      (tickets) =>
        tickets.segments[0].stops.length === transferCount ||
        tickets.segments[1].stops.length === transferCount
    );
  }

  switch (selectedFilter) {
    case "cheapest":
      mutableTickets.sort((a, b) => a.price - b.price);
      break;
    case "fastest":
      mutableTickets.sort(
        (a, b) =>
          a.segments[0].duration +
          a.segments[1].duration -
          (b.segments[0].duration + b.segments[1].duration)
      );
      break;
    default:
      break;
  }

  dispatch(setFilteredTickets(mutableTickets));

  return mutableTickets;
});

export const { setFilter, setFilteredTickets } = filtersSlice.actions;

// export const getSelectedFilter = (state: RootState) =>
//   state.filters.selectedFilter;
// export const getFilteredTickets = (state: RootState) =>
//   state.filters.filteredTickets;
// export const selectFilteredTickets = createSelector(
//   [getFilteredTickets],
//   (filteredTickets) => filteredTickets
// );

export default filtersSlice.reducer;
