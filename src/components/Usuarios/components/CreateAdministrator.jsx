import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UserService from '../Services/Service-Usuarios';

export function CreateAdministrator() {
  const navigate = useNavigate();

  const administratorSchema = yup.object({
    PrimerNombre: yup.string().required('El Primer Nombre es obligatorio'),
    SegundoNombre: yup.string().required('El Segundo Nombre es obligatorio'),
    PrimerApellido: yup.string().required('El Primer Apellido es obligatorio'),
    SegundoApellido: yup.string().required('El Segundo Apellido es obligatorio'),
    CorreoElectronico: yup.string().required('El Correo Electronico es Obligatorio'),
    Identificacion: yup.string(),
    DireccionProvincia: yup.string(),
    DireccionCanton: yup.string(),
    DireccionDistrito: yup.string(),
    Telefono: yup.string(),
  });

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      PrimerNombre: '',
      SegundoNombre: '',
      PrimerApellido: '',
      SegundoApellido: '',
      CorreoElectronico: '',
      Identificacion: '',
      DireccionProvincia: '',
      DireccionCanton: '',
      DireccionDistrito: '',
      Telefono: '',
      Contrasenna: '12345', // Default password for administrator
      RolId: 1, // Role ID for administrator
    },
    resolver: yupResolver(administratorSchema),
  });

  const [error, setError] = useState('');

  const notify = () => toast.success('Administrador creado', {
    duration: 4000,
    position: 'top-center',
  });

  const onSubmit = (formData) => {
    try {
      console.log(formData);
      // Call the service method to create an administrator
      UserService.createUser(formData)
        .then((response) => {
          console.log(response);
          notify();
          return navigate('/usuario/lista');
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            throw new Error('Respuesta no válida del servidor');
          }
        });
    } catch (e) {
      // Handle your error
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Crear Administrador
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='PrimerNombre'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='PrimerNombre'
                    label='Nombre'
                    error={Boolean(errors.PrimerNombre)}
                    helperText={errors.PrimerNombre ? errors.PrimerNombre.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='SegundoNombre'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='SegundoNombre'
                    label='Segundo nombre'
                    error={Boolean(errors.SegundoNombre)}
                    helperText={errors.SegundoNombre ? errors.SegundoNombre.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='CorreoElectronico'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='CorreoElectronico'
                    label='Correo Electronico'
                    error={Boolean(errors.CorreoElectronico)}
                    helperText={errors.CorreoElectronico ? errors.CorreoElectronico.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='PrimerApellido'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='PrimerApellido'
                    label='Primer apellido'
                    error={Boolean(errors.PrimerApellido)}
                    helperText={errors.PrimerApellido ? errors.PrimerApellido.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='SegundoApellido'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='SegundoApellido'
                    label='Segundo apellido'
                    error={Boolean(errors.SegundoApellido)}
                    helperText={errors.SegundoApellido ? errors.SegundoApellido.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='Identificacion'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='Identificacion'
                    label='Identificacion'
                    error={Boolean(errors.Identificacion)}
                    helperText={errors.Identificacion ? errors.Identificacion.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='DireccionProvincia'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='DireccionProvincia'
                    label='Dirección Provincia'
                    error={Boolean(errors.DireccionProvincia)}
                    helperText={errors.DireccionProvincia ? errors.DireccionProvincia.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='DireccionCanton'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='DireccionCanton'
                    label='Dirección Cantón'
                    error={Boolean(errors.DireccionCanton)}
                    helperText={errors.DireccionCanton ? errors.DireccionCanton.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='DireccionDistrito'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='DireccionDistrito'
                    label='Dirección Distrito'
                    error={Boolean(errors.DireccionDistrito)}
                    helperText={errors.DireccionDistrito ? errors.DireccionDistrito.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='Telefono'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='Telefono'
                    label='Telefono'
                    error={Boolean(errors.Telefono)}
                    helperText={errors.Telefono ? errors.Telefono.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>
              Crear Administrador
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
  
}
