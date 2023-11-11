import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormHelperText } from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import ActorService from '../../services/ActorService';
import CentroAcopioService from '../services/CentroAcopioService';
import { toast } from 'react-hot-toast';
import CentroAcopioAdminService from '../Usuarios/Services/Service-Usuarios';
import { SelectDirector } from './Form/SelectDirector';

import { ActorsForm } from './Form/ActorsForm';
//https://www.npmjs.com/package/@hookform/resolvers

export function CreateMovie() {
  const navigate = useNavigate();

  // Esquema de validación
  const CentroAcopioSchema = yup.object({
    Nombre: yup
      .string()
      .required('El título es requerido')
      .min(2, 'El título debe tener 2 caracteres'),
    DireccionProvincia: yup
    .string()
    .required('La duración es requerida'),
    DireccionCanton: yup
      .number()
      .typeError('Solo acepta números')
      .required('El año es requerido')
      .positive('Solo acepta números positivos'),
    DireccionDistrito: yup
    .string()
    .required('El idioma es requerido'),
    AdministradorID: yup
      .number()
      .typeError('El director es requerido')
      .required('El director es requerido'),
 
    Materiales: yup.array().of(
      yup.object().shape({
        actor_id: yup.number().typeError('El actor es requerido')
        .required('El actor es requerido'),
        role: yup.string().required('El rol es requerido'),
      }))
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Nombre: '',
      DireccionCanton: '',
      DireccionDistrito: '',
      DireccionProvincia: '',
      AdministradorID: '',
      genres: [],
      Materiales: [
        {
         ID: '',
          Tipo: '',

        },
      ],
      total: 0
    },
    // Asignación de validaciones
    resolver: yupResolver(CentroAcopioSchema),
  });
  //Definir seguimiento de actores con Watch
  const watchActors=watch('Materiales')
  const handleInputChange=(index, name, value)=>{
    //actors.1.role='Rol 1'
    setValue(name,value)
    //Obtener los valores del formulario
    const values=getValues()
    console.log(values.Materiales[index])
    let total='Reparto: '
    values.Materiales.map((item)=>{
      total+=`${item.role} `
    })
    setValue('total',total)
  }
  // useFieldArray:
  // relaciones de muchos a muchos, con más campos además
  // de las llaves primaras
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'Material',
  });
  // Eliminar actor de listado
  const removeMateriales = (index) => {
    if (fields.length === 1) {
      return;
    }
    remove(index);
  };
  // Agregar un nuevo actor
  const addNewMaterial = () => {
    append({
      ID: '',
      Tipo: '',
    });
  };
  const [error, setError] = useState('');

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log('Formulario:');
    console.log(DataForm);

    try {
      if (CentroAcopioSchema.isValid()) {
        //Crear pelicula
        CentroAcopioService.createMovie(DataForm)
          .then((response) => {
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            if (response.data.results != null) {
              toast.success(response.data.results, {
                duration: 4000,
                position: 'top-center',
              });
              // Redireccion a la tabla
              return navigate('/movie-table');
            }
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);
              throw new Error('Respuesta no válida del servidor');
            }
          });
      }
    } catch (e) {
      //Capturar error
    }
  };

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);
  //Lista de Directores
  const [dataAdministrador, setDataAdministrador] = useState({});
  const [loadedAdministrador, setLoadedAdministrador] = useState(false);
  useEffect(() => {
    CentroAcopioAdminService.getAdministradores()
      .then((response) => {
        console.log(response);
        setDataAdministrador(response.data.results);
        setLoadedAdministrador(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedAdministrador(false);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, []);
  

  //Lista de actores
  const [dataActors, setDataActors] = useState({});
  const [loadedActors, setLoadedActors] = useState(false);
  useEffect(() => {
    ActorService.getActors()
      .then((response) => {
        console.log(response);
        setDataActors(response.data.results);
        setLoadedActors(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedActors(false);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, []);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Crear Pelicula
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='Nombre'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='Nombre'
                    label='Nombre'
                    error={Boolean(errors.Nombre)}
                    helperText={errors.Nombre ? errors.Nombre.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='DireccionCanton'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='DireccionCanton'
                    label='Dirección Canton'
                    error={Boolean(errors.DireccionCanton)}
                    helperText={errors.DireccionCanton ? errors.DireccionCanton.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='DireccionProvincia'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='DireccionProvincia'
                    label='Direccion Provincia'
                    error={Boolean(errors.DireccionProvincia)}
                    helperText={errors.DireccionProvincia ? errors.DireccionProvincia.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='DireccionDistrito'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='DireccionDistrito'
                    label='Direccion Distrito'
                    error={Boolean(errors.DireccionDistrito)}
                    helperText={errors.DireccionDistrito ? errors.DireccionDistrito.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              {/* Lista de directores */}
              {loadedAdministrador && (
                <Controller
                  name='AdministradorID'
                  control={control}
                  render={({ field }) => (
                    <SelectDirector
                      field={field}
                      data={dataAdministrador}
                      error={Boolean(errors.AdministradorID)}
                      onChange={(e) =>
                        setValue('AdministradorID', e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.AdministradorID ? errors.AdministradorID.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' gutterBottom>
              Actores
              <Tooltip title='Agregar Material'>
                <span>
                  <IconButton color='secondary' onClick={addNewMaterial}>
                    <AddIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Typography>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              {/* Array de controles de actor */}
              {loadedActors &&
                fields.map((field, index) => (
                  <div key={index}>
                    <ActorsForm
                      name='Materiales'
                      field={field}
                      data={dataActors}
                      key={field.id}
                      index={index}
                      onRemove={removeMateriales}
                      control={control}
                      onInputChange={handleInputChange}
                      disableRemoveButton={fields.length === 1}
                      onChange={(e) =>
                        setValue('Materiales', e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                    {errors.Materiales && (
                      <FormHelperText
                        component={'span'}
                        sx={{ color: '#d32f2f' }}
                      >
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          {errors?.Materiales[index]?.ID && (
                            <Grid item xs={6}>
                              {errors?.Materiales[index]?.ID
                                ? errors?.Materiales[index]?.ID?.message
                                : ' '}
                            </Grid>
                          )}
                          {errors?.Materiales[index]?.Tipo && (
                            <Grid item xs={6}>
                              {errors?.Materiales[index]?.Tipo
                                ? errors?.Materiales[index]?.Tipo?.message
                                : ' '}
                            </Grid>
                          )}
                        </Grid>
                      </FormHelperText>
                    )}
                  </div>
                ))}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='total'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='total'
                    label='Total'
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              sx={{ m: 1 }}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
      <h3>Resultado Watch</h3>
      {watchActors.map((item,index)=>{
        return(
          <p key={index}>
            {index}.  Actor: {item.actor_id} , Rol: {item.role}
          </p>
        )
      })

      }
    </>
  );
}
