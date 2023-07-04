import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ITicketsSliceState } from "../types";

const initialState: ITicketsSliceState = {
  searchId: [],
  tickets: [],
  processedTickets: [],
  searchIdError: null,
  ticketsError: null,
  displayCount: 5,
  fetchTicketsStatus: "",
  searchIdStatus: "",
  searchCompleted: false,
};

export const fetchSearchId = createAsyncThunk(
  "tickets/fetchSearchId",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://aviasales-test-api.kata.academy/search"
      );
      if (!response.ok) {
        throw new Error("Server error");
      }
      const body = await response.json();
      console.log(body);
      return [body.searchId];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async function (_, { getState, rejectWithValue }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchId = (getState() as any).tickets.searchId[0];
    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
      );
      if (!response.ok) {
        throw new Error("Server error");
      }
      const body = await response.json();
      console.log(body);
      return [body.tickets, body.stop];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    increaseDisplayCount: (state) => {
      state.displayCount = state.displayCount + 5;
    },
    filterTickets: (state, action) => {
      const {
        zeroTransfersChecked,
        oneTransferChecked,
        twoTransfersChecked,
        threeTransfersChecked,
      } = action.payload;

      if (
        zeroTransfersChecked ||
        oneTransferChecked ||
        twoTransfersChecked ||
        threeTransfersChecked
      ) {
        const transferCount = zeroTransfersChecked
          ? 0
          : oneTransferChecked
          ? 1
          : twoTransfersChecked
          ? 2
          : 3;

        state.processedTickets = state.tickets.filter(
          (t) =>
            t.segments[0].stops.length === transferCount ||
            t.segments[1].stops.length === transferCount
        );
      }
    },
    organizeTickets: (state, action) => {
      const { selectedFilter } = action.payload;

      switch (selectedFilter) {
        case "cheapest":
          state.processedTickets = state.tickets.sort(
            (a, b) => a.price - b.price
          );
          break;
        case "fastest":
          state.processedTickets = state.tickets.sort(
            (a, b) =>
              a.segments[0].duration +
              a.segments[1].duration -
              (b.segments[0].duration + b.segments[1].duration)
          );
          break;
        default:
          state.processedTickets = state.tickets;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    const asyncFunctions = [
      {
        action: fetchSearchId,
        payloadKey: "searchId",
        errorKey: "searchIdError",
        statusKey: "searchIdStatus",
      },
      {
        action: fetchTickets,
        payloadKey: "tickets",
        errorKey: "ticketsError",
        statusKey: "fetchTicketsStatus",
      },
    ];

    asyncFunctions.forEach(({ action, payloadKey, errorKey, statusKey }) => {
      builder
        .addCase(action.pending, (state: ITicketsSliceState) => {
          state[statusKey] = "loading";
          state[errorKey] = null;
        })
        .addCase(action.fulfilled, (state: ITicketsSliceState, action) => {
          if (payloadKey === "tickets") {
            state.searchCompleted = action.payload[1];
            state.processedTickets = state.processedTickets.concat(
              action.payload[0]
            );
          }
          state[statusKey] = "resolved";
          state[payloadKey] = state[payloadKey].concat(action.payload[0]);
          state[errorKey] = null;
        })
        .addCase(action.rejected, (state: ITicketsSliceState, action) => {
          console.log(action.payload);
          state[statusKey] = "rejected";
          state[errorKey] = action.payload;
        });
    });
  },
});

export const { increaseDisplayCount, filterTickets, organizeTickets } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
