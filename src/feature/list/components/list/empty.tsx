import { Typography } from '@mui/material'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'

const iconStyles = {
  fontSize: 60,
  marginTop: 5,
  marginBottom: 3
}

export const Empty = () => (
  <Typography
    component="div"
    flex={1}
    display="flex"
    flexDirection="column"
    alignItems="center"
  >
    <TravelExploreIcon
      sx={iconStyles}
    />
    <Typography
      variant="h6"
      textAlign="center"
    >
      {'Sorry, we couldn\'t find what you\'re looking for'}
    </Typography>
  </Typography>
)