import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_ROOT } from '@constants/envrionment'

export const swApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Character'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT
  }),
  endpoints: () => ({})
})