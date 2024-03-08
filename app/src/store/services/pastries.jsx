import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const urlApi = 'http://localhost:3001/api';

export const pastryApi = createApi({
  reducerPath: 'pastryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: urlApi,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    // Récupère la liste de toutes les pâtisseries
    getPastries: builder.query({
      query: () => 'pastries',
    }),
    // Récupère une pâtisserie par son ID
    getPastryById: builder.query({
      query: (id) => `pastry/${id}`,
    }),
    // Recherche de pâtisseries par mot-clé
    searchPastries: builder.query({
      query: (word) => `pastries-search/${word}`,
    }),
    // Récupération paginée des pâtisseries
    getPastriesWithPagination: builder.query({
      query: ({ offset, limit }) => `pastries/${offset}/${limit}`,
    }),
    // Récupération des pâtisseries triées par quantité
    getPastriesOrderedByQuantity: builder.query({
      query: ({ offset, limit }) => `pastries/order-quantity/${offset}/${limit}`,
    }),
    // Comptage des pâtisseries
    getPastriesCount: builder.query({
      query: () => 'pastries-count',
    }),
    // Ajout d'une nouvelle pâtisserie
    addPastry: builder.mutation({
      query: (newPastry) => ({
        url: 'pastry',
        method: 'POST',
        body: newPastry,
      }),
    }),
    // Modification d'une pâtisserie existante
    updatePastry: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `pastry/${id}`,
        method: 'PUT',
        body: rest,
      }),
    }),
    // Suppression d'une pâtisserie
    deletePastry: builder.mutation({
      query: (id) => ({
        url: `pastry/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPastriesQuery,
  useGetPastryByIdQuery,
  useSearchPastriesQuery,
  useGetPastriesWithPaginationQuery,
  useGetPastriesOrderedByQuantityQuery,
  useGetPastriesCountQuery,
  useAddPastryMutation,
  useUpdatePastryMutation,
  useDeletePastryMutation,
} = pastryApi;
