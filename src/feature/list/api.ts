import { swApi } from '@services/api'
import { CharacterResponseData } from '@models/CharacterResponseData'
import { getIdByUrl } from '@utils/getIdByUrl'
import { getFromLocalStorage } from '@hooks/useLocalStore'

export interface ListResponse {
  count: number;
  next: string|undefined;
  previous: string|undefined;
  results: CharacterResponseData[];
  pages: number;
  page: number;
}

export interface ApiErrorResponse {
  status: number;
  data: {
    detail: string;
  };
}

export const PAGE_LIMIT = 10

// NOTE: This function and solution with local store is here only 
// only because such demands
const modifyResults = (results: CharacterResponseData[]) => {
  return results.map(item => ({
    ...item,
    ...(getFromLocalStorage(`character-${getIdByUrl(item.url)}`, {}))
  }))
}

const api = swApi.injectEndpoints({
  endpoints: (build) => ({
    getList: build.query<ListResponse, Object>({
      query: (params: URLSearchParams) => ({
        url: '/people',
        params: {
          limit: PAGE_LIMIT,
          ...params
        }
      }),
      transformResponse: (res: ListResponse) => ({
        ...res,
        results: modifyResults(res.results),
        pages: Math.ceil(res.count / PAGE_LIMIT),
        page: res.next ? parseInt(new URL(res.next).searchParams.get('page') || '1') : 1
      }),
      transformErrorResponse: (err: ApiErrorResponse) => ({
        status: err.status,
        data: err.data.detail
      })
    })
  }),
  overrideExisting: false,
})

export default api

export const { useGetListQuery } = api