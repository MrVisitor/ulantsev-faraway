import { useMemo } from 'react'
import Cell from './cell'
import { Box, Button, Typography } from '@mui/material'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { useSearchParams } from 'react-router-dom'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import { CharacterResponseData } from '../../../../models/CharacterResponseData'
import { store } from '../../../../app/store'


export type ListProps<P = React.PropsWithChildren> = P & {
  error?: FetchBaseQueryError;
  isLoading: boolean;
  data?: CharacterResponseData[]
}

export default function ({ isLoading, data, error }: ListProps) {
  const [ , setURLSearchParams ] = useSearchParams()
  // const data = useAppSelector(selectCharacters)

  const handleClick = () => {
    setURLSearchParams(() => new URLSearchParams())
  }

  if (error) {
    return (
      <Typography
        component="div"
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box fontSize="h1.fontSize">{error.status}</Box>
        <Box fontSize="h6.fontSize" marginBottom={5}>
          Oops, something went wrong
        </Box>
        <Button
          onClick={handleClick}
          variant="outlined"
          size="large"
        >
          Retry
        </Button>
      </Typography>
    )
  }

  const dataSet: undefined|Array<CharacterResponseData | undefined> =
    isLoading ? Array.from({ length: 6 }) : data

  const iconStyles = useMemo(() => ({
    fontSize: 60,
    marginTop: 5,
    marginBottom: 3
  }), [])

  if (!dataSet?.length) {
    return (
      <Typography
        component="div"
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <TravelExploreIcon sx={iconStyles}/>
        <Typography
          variant="h6"
          textAlign="center"
        >
          {'Sorry, we couldn\'t find what you\'re looking for'}
        </Typography>
      </Typography>
    )
  }

  return (
    <>
      {dataSet?.map((item, index) => (
        <Cell
          key={`key-${index}`}
          isLoading={isLoading}
          data={item!}
        />
      ))}
    </>
  )
}