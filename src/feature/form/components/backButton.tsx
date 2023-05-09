import { IconButton } from '@mui/material'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

function BackButton() {
  const navigate = useNavigate()
  const handleClick = useCallback(() => navigate(-1), [navigate])

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