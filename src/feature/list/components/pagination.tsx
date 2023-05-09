import { Pagination as MUIPagination, PaginationProps } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const Pagination = (props: PaginationProps) => {
  const [ searchParams, setSearchParams ] = useSearchParams()

  const page = useMemo(() => {
    return parseInt(searchParams.get('page') || '1', 10)
  }, [searchParams])

  const handleChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams(state => {
      state.set('page', `${value}`)
      return state
    })
    window.scrollTo(0, 0)
  }, [setSearchParams])

  return !props.count ? null : (
    <MUIPagination
      {...props}
      page={page}
      onChange={handleChange}
    />
  )
}