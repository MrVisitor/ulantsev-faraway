import { Box, Grid } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useGetListQuery } from './api'
import { Pagination } from './components/pagination'
import { List } from './components/list'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

const footerSX = {
  flex: 1,
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  py: 5
}

function ListScreen() {
  const [ URLSearchParams ] = useSearchParams()

  const { data, isLoading, error, isFetching } = useGetListQuery(
    Object.fromEntries(URLSearchParams)
  )

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