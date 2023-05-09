import { useCallback } from 'react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { useSearchParams } from 'react-router-dom'
import { CharacterResponseData } from '@models/CharacterResponseData'
import { Cell } from './cell'
import { Oops } from './oops'
import { Empty } from './empty'

export type ListProps<P = React.PropsWithChildren> = P & {
  error?: FetchBaseQueryError;
  isLoading: boolean;
  data?: CharacterResponseData[]
}

export default function ({ isLoading, data, error }: ListProps) {
  const [ , setURLSearchParams ] = useSearchParams()

  const handleClick = useCallback(() => {
    setURLSearchParams(() => new URLSearchParams())
  }, [setURLSearchParams])

  if (error) {
    return (
      <Oops
        onClick={handleClick}
        title={`${error.status}`}
      />
    )
  }

  const dataSet: undefined|Array<CharacterResponseData | undefined> =
    isLoading ? Array.from({ length: 6 }) : data

  if (!dataSet?.length) {
    return (
      <Empty/>
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