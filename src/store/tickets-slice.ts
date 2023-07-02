import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ITicketsSliceState } from "../types";

const initialState: ITicketsSliceState = {
  searchId: [],
  tickets: [],
  searchIdError: null,
  ticketsError: null,
  displayCount: 5,
  fetchTicketsStatus: "",
  searchIdStatus: "",
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
      return body.searchId;
    } catch (error) {
      console.log("Couldn't fetch searchId");
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
      return body.tickets;
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
          state[statusKey] = "resolved";
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          state[payloadKey] = (state[payloadKey] as any[]).concat(
            action.payload
          );
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

export const { increaseDisplayCount } = ticketsSlice.actions;
export default ticketsSlice.reducer;
