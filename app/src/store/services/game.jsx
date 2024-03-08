import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const urlApi = 'http://localhost:3001';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({ baseUrl: urlApi }),
  endpoints: (builder) => ({
    getWinPastries: builder.query({
      query: (quantity) => `game/win-pastries/${quantity}`,
    }),
  }),
});

export const { useGetAllPastriesQuery, useGetWinPastriesQuery } = gameApi;
