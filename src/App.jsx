import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { PageNotFound } from './components/Home/PageNotFound'
import { ListMovies } from './components/Movie/ListMovies'
import Materiales from './components/Materiales/Materiales'
import CentrosAcopio from './components/Centros-Acopio/Centros-Acopio'
import { DetailMovie } from './components/Movie/DetailMovie'
import { Create, Login } from '@mui/icons-material'
import CanjesMaterialesMain from './components/Canje-Materiales/Canje-Materiales'
import CanjesMaterialesByClienteMain from './components/Canje-Materiales/Canje-Materiales-By-Cliente'
import CanjesMaterialesByAdministradorMain from './components/Canje-Materiales/Canje-Materiales-By-Administrador'
import { DetailCanjeMateriales } from './components/Canje-Materiales/Components/Detail-Canje-Materiales'
import { DetailMateriales } from './components/Materiales/Components/Detail-Materiales'
import { DetailCentroAcopio } from './components/Centros-Acopio/Components/Detail-CentroAcopio'
import { CreateMaterial } from './components/Materiales/Form/CreateMaterial'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateCentroAcopio } from './components/Centros-Acopio/Form/CreateCentroAcopio'
import { UpdateCentroAcopio } from './components/Centros-Acopio/Form/UpdateCentroAcopio'
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
    path: '/canjesMateriales',
    element: <CanjesMaterialesMain />
  },
  {
    path: '/canjesMaterialesByCliente',
    element: <CanjesMaterialesByClienteMain />
  },
  {
    path: '/canjesMaterialesByAdministrador',
    element: <CanjesMaterialesByAdministradorMain/>
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
    path: '/canjeDeMateriales/:id',
    element: <DetailCanjeMateriales />
  },
  {
path: '/material/:id',
element: <DetailMateriales/> 
  },
  {
    path: '/centroAcopio/:id',
    element: <DetailCentroAcopio/> 
      },
  {
    path: '/user/login',
    element : <Login />
  },
  {
    path: 'material/crear',
    element: <CreateMaterial/>
  },
  {
    path: 'centroAcopio/crear',
    element: <CreateCentroAcopio/>
  },
  {
    path: 'centroAcopio/actualizar/:id',
   
    element: <UpdateCentroAcopio/>
  },
])

export default function App(){
  return (
    <Layout>
      <ToastContainer/>
        <RouterProvider router={router} />

    </Layout>
   
  )
}
