import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { PageNotFound } from './components/Home/PageNotFound'
import { ListMovies } from './components/Movie/ListMovies'
import Materiales from './components/Materiales/Materiales'
import CentrosAcopio from './components/Centros-Acopio/Centros-Acopio'
import { DetailMovie } from './components/Movie/DetailMovie'
import { Login } from '@mui/icons-material'

const router= createBrowserRouter([
  {
    path:'/',
    element: <Home />
  },
  {
    path: '*',
    element: <PageNotFound />
  },
  {
    path: '/movie',
    element: <ListMovies />
  },
  {
    path: '/materiales',
    element: <Materiales />
  },
  {
    path: '/centroAcopio',
    element: <CentrosAcopio />
  },
  {
    path: '/movie/:id',
    element: <DetailMovie />
  },
  
  {
    path: '/user/login',
    element : <Login />
  }
])

export default function App(){
  return (
    <Layout>
        <RouterProvider router={router} />
    </Layout>
  )
}
