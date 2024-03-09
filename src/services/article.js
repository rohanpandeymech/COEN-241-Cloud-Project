// In your services/article.js or wherever your API slice is defined
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://89edi8le40.execute-api.us-east-2.amazonaws.com/dev/' }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (articleUrl) => ({
        url: `summarize`, // The endpoint path
        method: 'POST',
        body: {
          url: articleUrl
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;