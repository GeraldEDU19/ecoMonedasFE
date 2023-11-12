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
import CentroAcopioService from '../../Centros-Acopio/Services/Service-Centros-Acopio';
import { toast } from 'react-hot-toast';
import CentroAcopioAdminService from '../../Usuarios/Services/Service-Usuarios';
import { SelectAdministrador } from '../../Centros-Acopio/Form/SelectAdministrador';
import { MaterialesForm } from '../../Centros-Acopio/Form/MaterialesForm';
import MaterialService from '../../Materiales/Services/Service-Materiales';
//https://www.npmjs.com/package/@hookform/resolvers

export function CreateCentroAcopio() {
  const navigate = useNavigate();

  // Esquema de validación
  const CentroAcopioSchema = yup.object({
    Nombre: yup
      .string()
      .required('El Nombre es requerido')
      .min(2, 'El Nombre debe tener 2 caracteres'),
    DireccionProvincia: yup
    .string()
    .required('La Provincia es requerida'),
    DireccionCanton: yup
      .string()
      .required('El Canton es requerido'),
    DireccionDistrito: yup
    .string()
    .required('El Distrito es requerido'),
    DireccionExacta: yup
    .string()
    .required('La direccion exacta es requerida'),
    AdministradorID: yup
      .number()
      .typeError('El Administrador es requerido')
      .required('El Administrador es requerido'),
      Telefono: yup
      .string()
      .typeError('El telefono es requerido')
      .required('El telefono es requerido'),
      HorarioAtencion : yup
      .string()
      .required('El idioma es requerido'),
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
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Nombre: '',
      DireccionCanton: '',
      DireccionDistrito: '',
      DireccionProvincia: '',
      AdministradorID: '',
      Materiales: [
        {
         MaterialID: '',
         

        },
      ],
      total: 0
    },
    // Asignación de validaciones
    resolver: yupResolver(CentroAcopioSchema),
  });
  //Definir seguimiento de actores con Watch
  
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
  const [dataMateriales, setDataMateriales] = useState({});
  const [loadedMateriales, setLoadedMateriales] = useState(false);
  useEffect(() => {
    MaterialService.getMateriales()
      .then((response) => {
        console.log(response);
        setDataMateriales(response.data.results);
        setLoadedMateriales(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedMateriales(false);
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
              Crear Centro de Acopio
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
                    <SelectAdministrador
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
              Materiales
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
              {loadedMateriales &&
                fields.map((field, index) => (
                  <div key={index}>
                    <MaterialesForm
                      name='Materiales'
                      field={field}
                      data={dataMateriales}
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
                          
                        </Grid>
                      </FormHelperText>
                    )}
                  </div>
                ))}
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
     
    </>
  );
}
