import * as React from 'react'
import { useState, useContext } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { UserContext } from "../../../context/UserContext"
import toast from 'react-hot-toast'
import UserService from '../Services/Service-Usuarios'

export function Login () {
  const navigate = useNavigate()
  const {saveUser} =useContext(UserContext)
  // Esquema de validación
  const loginSchema = yup.object({
    CorreoElectronico: yup.string()
      .required('El CorreoElectronico es requerido')
      .email('Formato Correo Electronico'),
    Contrasenna: yup.string()
      .required('la Contraseña es requerida')
  })
  const { control, handleSubmit, formState: { errors } } =
  useForm({
    // Valores iniciales
    defaultValues: {
      CorreoElectronico: '',
      Contrasenna: ''
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema)
  })

  // Valores de formulario
  
  const [error, setError] = useState('');
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      
      UserService.loginUser(DataForm)
        .then(response => {
          console.log(response)
          if(response.data.results !=null && response.data.results !='undefined' && 
          response.data.results!='Usuario no válido'){
            //Usuario valido o identificado
            //Guardar el token
            saveUser(response.data.results)
            toast.success('Bienvenido, usuario',{
              duration:4000,
              position:'top-right'
            })
            return navigate('/')    
          }else{
            console.log("Debería entrar aquí")
            //Usuario no valido
            
                toast.error('Usuario NO válido',{
                  duration:4000,
                  position:'top-center'
                })
            
          }
           
        })
        .catch(error => {
          if (error instanceof SyntaxError) {
            console.log(error)
            setError(error)
            throw new Error('Respuesta no válida del servidor')
          }
        });
       
    } catch (e) {
      // handle your error
    }
  }
  
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e)

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Iniciar Sesión
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Controller
              name="CorreoElectronico"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="CorreoElectronico"
                  label="Correo Electrónico"
                  variant="outlined"
                  error={Boolean(errors.CorreoElectronico)}
                  helperText={errors.CorreoElectronico ? errors.CorreoElectronico.message : ' '}
                  margin="dense"
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Controller
              name="Contrasenna"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="Contrasenna"
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  error={Boolean(errors.Contrasenna)}
                  helperText={errors.Contrasenna ? errors.Contrasenna.message : ' '}
                  margin="dense"
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Ingresar
          </Button>
        </Grid>
      </Grid>
    </form>
    </>
  )
}



