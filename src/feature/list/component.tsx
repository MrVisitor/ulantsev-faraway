import { Box, Grid } from '@mui/material'
import api from './api'
import { useSearchParams } from 'react-router-dom'
import { Pagination } from './components/pagination'
import { List } from './components/list'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { useMemo } from 'react'


function ListScreen() {
  const [ URLSearchParams ] = useSearchParams()
  const { useGetListQuery } = api

  const { data, isLoading, error, isFetching } = useGetListQuery(
    Object.fromEntries(URLSearchParams)
  )

  const footerSX = useMemo(() => ({
    flex: 1,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    py: 5
  }), [])

  return (
    <>
      <Grid
        container
        component="section"
        py={2}
      >
        <List
          data={data?.results}
          error={error as FetchBaseQueryError}
          isLoading={isLoading||isFetching}
        />
      </Grid>
      <Grid component="footer">
        <Box sx={footerSX}>
          <Pagination
            count={data?.pages}
          />
        </Box>
      </Grid>
    </>
  )
}

export default ListScreen