import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const swApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Character'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api'
  }),
  endpoints: () => ({})
})