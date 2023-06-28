import { configureStore } from "@reduxjs/toolkit";
import checkboxesReducer from "./checkboxes-slice";
import filtersReducer from "./filters-slice";
import ticketsReducer from "./tickets-slice";

const store = configureStore({
  reducer: {
    checkboxes: checkboxesReducer,
    filters: filtersReducer,
    tickets: ticketsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
