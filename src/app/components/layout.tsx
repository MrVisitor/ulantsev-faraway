import { Container } from '@mui/material'
import React from 'react'

export const Layout = ({ children }: React.PropsWithChildren) => (
  <Container maxWidth="md">{children}</Container>
)