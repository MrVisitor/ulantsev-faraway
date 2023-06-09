import { swApi } from '@services/api'
import { CharacterResponseData } from '@models/CharacterResponseData'
import { getFromLocalStorage } from '@hooks/useLocalStore'
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query'

const api = swApi.injectEndpoints({
  endpoints: (build) => ({
    getByID: build.query<CharacterResponseData, string|number>({
      query: id => `people/${id}`,
      transformResponse: (baseQueryReturnValue: unknown, meta: FetchBaseQueryMeta | undefined, arg: string | number) => {
        const id = arg
        const res = baseQueryReturnValue as CharacterResponseData

        // NOTE: This function and solution with local store is here only 
        // only because such demands
        const storedData = getFromLocalStorage<CharacterResponseData>(`character-${id}`)

        return { ...res, ...storedData }
      },
    }),
    unpdateByID: build.mutation<CharacterResponseData, Partial<{id: string, data: CharacterResponseData}>>({
      queryFn(arg) {
        return { data: arg as CharacterResponseData }
      }
    })
  }),
  overrideExisting: false,
})

export default api

export const { useGetByIDQuery, useUnpdateByIDMutation } = api