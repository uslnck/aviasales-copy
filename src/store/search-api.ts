import {
  createApi,
  fetchBaseQuery,
  retry,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { IQueryArgs, IResponse } from "../types";

const staggeredBaseQueryWithBailOut = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: "https://aviasales-test-api.kata.academy/",
    })(args, api, extraOptions);

    if (result.error?.status === 404) retry.fail(result.error);
    if (result.error?.status === 500)
      console.log("Server error, refetching...");

    return result;
  },
  { maxRetries: 5 }
);

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: staggeredBaseQueryWithBailOut,
  endpoints: (build) => ({
    getSearchId: build.query<IQueryArgs, void>({
      query: () => `/search`,
    }),
    getTickets: build.query<IResponse, string>({
      query: (searchId) => `/tickets?searchId=${searchId}`,
      merge: (currentCache, newItems) => {
        currentCache.tickets = currentCache.tickets.concat(newItems.tickets);
        currentCache.stop = newItems.stop;
      },
    }),
  }),
});

export const { useGetSearchIdQuery, useGetTicketsQuery } = searchApi;
