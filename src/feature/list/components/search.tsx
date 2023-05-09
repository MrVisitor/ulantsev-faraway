import { useCallback, useEffect, useId, useMemo, useRef } from 'react'
import { TextField, debounce } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

function Search() {
  const inputRef = useRef<HTMLInputElement>()
  const [ URLSearchParams, setURLSearchParams ] = useSearchParams()

  const handleChange = useCallback((
    { target: { value } }: React.ChangeEvent<HTMLInputElement>
  ) => {
    setURLSearchParams(params => {
      if (!value) {
        params.delete('search')
        params.set('page', '1')
        return params
      }
      params.set('search', value)
      params.set('page', '1')
      return params
    })
  }, [setURLSearchParams])

  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 500),
    [handleChange]
  )

  useEffect(() => {
    return () => debouncedHandleChange.clear()
  }, [debouncedHandleChange])

  useEffect(() => {
    const value = URLSearchParams.get('search')

    if (inputRef.current && value && value !== inputRef.current?.value) {
      inputRef.current.value = value
    }
  }, [URLSearchParams])

  return (
    <TextField
      inputRef={inputRef}
      fullWidth
      id={useId()}
      label='Search'
      onChange={debouncedHandleChange}
    />
  )
}

export default Search