import { createTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { LinkProps } from '@mui/material/Link'


export const theme = createTheme({
  palette: {
    mode: 'dark',
    divider: 'rgba(255, 255, 255, .1)',
    background: {
      default: '#2D313D',
      paper: '#363C48'
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, .7)',
    },
    primary: {
      main: '#556cd6',
      dark: '#3C424F',
    },
    secondary: {
      main: '#19857b',
    },
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: Link,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: Link,
      },
    },
  }
})

export const globalStyles = {
  html: {
    height: '100%',
    overflowY: 'scroll'
  },
  body: {
    minHeight: '100%'
  },

}