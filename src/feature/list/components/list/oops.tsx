import { Box, Button, Typography } from '@mui/material'

interface OopsProps {
  onClick: () => void;
  title: string;
}

export const Oops = ({ onClick, title }: OopsProps) => (
  <Typography
    component="div"
    flex={1}
    display="flex"
    flexDirection="column"
    alignItems="center"
  >
    <Box fontSize="h1.fontSize">{title}</Box>
    <Box fontSize="h6.fontSize" marginBottom={5}>
      Oops, something went wrong
    </Box>
    <Button
      onClick={onClick}
      variant="outlined"
      size="large"
    >
      Retry
    </Button>
  </Typography>
)