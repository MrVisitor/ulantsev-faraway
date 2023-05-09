import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Card, Grid, Skeleton, Typography, CardActionArea } from '@mui/material'
import { getIdByUrl } from '@utils/getIdByUrl'
import { generateHexColorById } from '@utils/generateHexById'
import { CharacterResponseData } from '@models/CharacterResponseData'

export type ItemProps<P = React.PropsWithChildren> = P & {
  isLoading: boolean;
  data?: CharacterResponseData;
}

const styleProps = {
  xs: 12,
  sm: 6,
  md: 4,
  p: 1
}

export const Cell = ({ isLoading, data, ...props }: ItemProps) => {
  const dataById = useMemo(() => ({
    url: data?.url ? `/list/${getIdByUrl(data?.url)}` : '/',
    avatar: {
      bgcolor: generateHexColorById(Number(getIdByUrl(data?.url || ''))),
      color: 'white'
    }
  }), [data?.url])

  const created = useMemo(() => {
    return data?.created ? new Date(data?.created).toLocaleDateString() : 'unknown'
  }, [data?.created])

  return (
    <Grid item {...styleProps} {...props}>
      <Card variant="outlined">
        <CardActionArea
          component={Link}
          to={dataById.url}
        >
          <Grid container p={2} flexWrap="nowrap">
            <Grid item xs={3}>
              { isLoading ? (
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              ) : (
                <Avatar sx={dataById.avatar}>{data?.name[0]}</Avatar>
              )}
            </Grid>
            <Grid item xs={9}>
              <Typography noWrap variant="body1">
                { isLoading ? <Skeleton /> : data?.name }
              </Typography>
              <Typography noWrap width="1" variant="body2">
                { isLoading ? <Skeleton /> : `Created: ${created}` }
              </Typography>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Grid>
  )
}