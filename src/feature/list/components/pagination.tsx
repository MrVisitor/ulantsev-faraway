import { Pagination as MUIPagination, PaginationProps } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

export const Pagination = (props: PaginationProps) => {
  const [ searchParams, setSearchParams ] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams(state => {
      state.set('page', `${value}`)
      return state
    })
    window.scrollTo(0, 0)
  }

  return !props.count ? null : (
    <MUIPagination
      {...props}
      page={page}
      onChange={handleChange}
    />
  )
}