import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import checkboxesReducer from "./checkboxes-slice";
import filtersReducer from "./filters-slice";
import ticketsReducer from "./tickets-slice";
import { searchApi } from "./search-api";

const store = configureStore({
  reducer: {
    checkboxes: checkboxesReducer,
    filters: filtersReducer,
    tickets: ticketsReducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
