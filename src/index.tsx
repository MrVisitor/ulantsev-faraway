import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className'

import { App } from './app/app'
import { store } from './app/store'
import { globalStyles, theme } from './app/theme'

ClassNameGenerator.configure((componentName) => `faraway-${componentName}`)

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)