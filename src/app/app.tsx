import { Routes, Route, Navigate } from 'react-router-dom'
import { Grid } from '@mui/material'
import { ListScreen, ListSearch } from '../feature/list'
import { Form, FormBackButton } from '../feature/form'
import { Layout } from './components/layout'

export const App = () => {
  return (
    <Layout>
      <Grid
        component="header"
        py={2}
        px={1}
      >
        <Routes>
          <Route path="/list" element={ <ListSearch/> } />
          <Route path="/list/:characterID" element={ <FormBackButton/> } />
        </Routes>
      </Grid>
      <Routes>
        <Route path="/" element={<Navigate replace to="/list" />} />
        <Route path="/list" element={ <ListScreen/> } />
        <Route path="/list/:characterID" element={ <Form/> } />
      </Routes>
    </Layout>
  )
}