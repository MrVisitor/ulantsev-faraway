import { IconButton } from '@mui/material'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { useNavigate } from 'react-router-dom'

function BackButton() {
  const navigate = useNavigate()
  const handleClick = () => navigate(-1)

  return (
    <IconButton
      aria-label="back"
      size="large"
      onClick={handleClick}
    >
      <ArrowBackIosNewOutlinedIcon/>
    </IconButton>
  )
}

export default BackButton