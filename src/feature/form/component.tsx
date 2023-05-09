import { useCallback, useMemo } from 'react'
import { Button, CircularProgress, FormHelperText, Grid, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import api, { useGetByIDQuery, useUnpdateByIDMutation } from './api'
import schema, { FormFields } from './schema'
import { useLocalStorage } from '@hooks/useLocalStore'
import { useAppDispatch } from '@hooks/useApp'
import { CharacterResponseData } from '@models/CharacterResponseData'


function Form() {
  const navigate = useNavigate()
  const { characterID } = useParams()

  const { data, isLoading, isError } = useGetByIDQuery(characterID as string)

  const [ , setToLocalStorage ] = useLocalStorage<{}>(`character-${characterID}`, {})
  const [ updateByID ] = useUnpdateByIDMutation()
  const dispatch = useAppDispatch()

  const styleProps = useMemo(() => ({
    xs: 12, sm: 6, md: 4, p: 1
  }), [])

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<FormFields> = useCallback(updatedData => {
    if (characterID) {
      dispatch(api.util.resetApiState())
      setToLocalStorage(updatedData)
      updateByID({
        id: characterID,
        data: { ...data, ...updatedData } as CharacterResponseData
      })
      navigate(-1)
    }
  }, [characterID, data, dispatch, navigate, setToLocalStorage, updateByID])

  if (isLoading) {
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    )
  }

  if (isError) {
    return (
      <Typography
        variant="h6"
        textAlign="center"
      >
        {'Sorry, somesing went wrong, try to reload page'}
      </Typography>
    )
  }

  if (!data) {
    return null
  }

  return (
    <Grid
      container
      noValidate
      component="form"
      autoComplete="off"
      py={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      {Object.keys(schema.fields).map((key) => {
        return (
          <Grid
            item
            key={key}
            {...styleProps}
          >
            <TextField
              label={key.toLocaleUpperCase()}
              variant="outlined"
              defaultValue={data[key]} 
              fullWidth
              {...register(key)}
              error={!!errors[key]}
              helperText={
                <FormHelperText
                  component="span"
                >
                  {errors[key] ? errors[key]?.message as string : ''}
                </FormHelperText>
              }
            />
          </Grid>
        )
      })}
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        py={2}
      >
        <Button
          type="submit"
          variant="outlined"
          disabled={!!(Object.keys(errors).length)}
        >
          Save Changes
        </Button>
      </Grid>
    </Grid>
  )
}

export default Form