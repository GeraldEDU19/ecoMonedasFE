import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { PageNotFound } from './components/Home/PageNotFound'
import { ListMovies } from './components/Movie/ListMovies'
import Materiales from './components/Materiales/Materiales'
import CentrosAcopio from './components/Centros-Acopio/Centros-Acopio'
import { DetailMovie } from './components/Movie/DetailMovie'
import { Create } from '@mui/icons-material'
import CanjesMaterialesMain from './components/Canje-Materiales/Canje-Materiales'
import CanjesMaterialesByClienteMain from './components/Canje-Materiales/Canje-Materiales-By-Cliente'
import CanjesMaterialesByAdministradorMain from './components/Canje-Materiales/Canje-Materiales-By-Administrador'
import { DetailCanjeMateriales } from './components/Canje-Materiales/Components/Detail-Canje-Materiales'
import { DetailMateriales } from './components/Materiales/Components/Detail-Materiales'
import { DetailCentroAcopio } from './components/Centros-Acopio/Components/Detail-CentroAcopio'
import { CreateMaterial } from './components/Materiales/Form/CreateMaterial'
import { Auth } from './components/Usuarios/Components/Auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateCentroAcopio } from './components/Centros-Acopio/Form/CreateCentroAcopio'
import { UpdateCentroAcopio } from './components/Centros-Acopio/Form/UpdateCentroAcopio'
import CreateCanjeMaterialForm from './components/Canje-Materiales/Components/Create-Canje-Materiales'
import { Unauthorized } from './components/Usuarios/components/Unauthorized'
import { Logout } from './components/Usuarios/components/Logout'
import { Signup } from './components/Usuarios/components/Signup'
import UserProfile from './components/Usuarios/components/UserInfo'
import UserTable from './components/Usuarios/components/UserTable'
import ChangePassword from './components/Usuarios/components/UserChangePassword'
import { CreateAdministrator } from './components/Usuarios/components/CreateAdministrator'
import { Login } from './components/Usuarios/components/Login'
import UserProvider from './components/Usuarios/components/UserProvider'
const router = createBrowserRouter([
  {
    path: '/',
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
    path: '/',
    element: <Auth allowedRoles={['Administrador']} />,
    children: [
      {
        path: '/facturar',
        element: <CreateCanjeMaterialForm />
      },
    ]
  },
  
  
  {
    path: '/centroAcopio',
    element: <CentrosAcopio />
  },
  {
    path: '/canjeDeMateriales/:id',
    element: <DetailCanjeMateriales />
  },
  {
    path: '/material/:id',
    element: <DetailMateriales />
  },
  {
    path: '/centroAcopio/:id',
    element: <DetailCentroAcopio />
  },
  
    

    {
      path: '/',
      element: <Auth allowedRoles={['Cliente']} />,
      children: [
        {
          path: '/canjesMaterialesByCliente',
          element: <CanjesMaterialesByClienteMain />
        },
      ]
    },

  {
    path: '/',
    element: <Auth allowedRoles={['Administrador']} />,
    children: [
      {
        path: '/material/crear',
        element: <CreateMaterial />
      },
    ]
  },
  {
    path: '/',
    element: <Auth allowedRoles={['Administrador']} />,
    children: [
      {
        path: '/centroAcopio/crear',
        element: <CreateCentroAcopio />
      },
    ]
  },
  {
    path: '/',
    element: <Auth allowedRoles={['Administrador']} />,
    children: [
      {
        path: '/centroAcopio/actualizar/:id',
        element: <UpdateCentroAcopio />
      },
      {
        path: '/usuario/crearAdministrador',
        element: <CreateAdministrator />
      },
      {
        path: '/canjesMaterialesByAdministrador',
        element: <CanjesMaterialesByAdministradorMain />
      },
    ]
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />
  },
  {
    path: '/usuario/iniciosesion',
    element: <Login />
  },
  {
    path: '/usuario/lista',
    element: <UserTable />
  },
  {
    path: '/usuario/informacion',
    element: <UserProfile />
  },
  {
    path: '/usuario/cambiarcontrasenna',
    element: <ChangePassword />
  },
  {
    path: '/usuario/cerrarsesion',
    element: <Logout />
  },
  {
    path: '/usuario/crear',
    element: <Signup />
  },
  
])

export default function App() {
  return (
    <UserProvider>


      <Layout>
        <ToastContainer />
        <RouterProvider router={router} />

      </Layout>
    </UserProvider>
  )
}
