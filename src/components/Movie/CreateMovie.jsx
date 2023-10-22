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
import {  useNavigate } from 'react-router-dom';
import GenreService from '../../services/GenreService';
import { SelectGenres } from './SelectGenres';
import ActorService from '../../services/ActorService';
import { ActorsForm } from './ActorsForm';
import MovieService from '../../services/MovieService';
import { toast } from 'react-hot-toast';
import { SelectDirector } from './SelectDirector';
import DirectorService from '../../services/DirectorService';

export function CreateMovie() {
  const navigate = useNavigate()
  
  // Esquema de validación
  const movieSchema = yup.object({
    title: yup.string()
       .required('El titulo es requerido')
       .min (2, 'El titulo debe tener 2 caracteres')
       time:yup
       .string ()
       .required('La duracion es requerida'),
       year: yup
        .number()
        .typeError('Solo acepta numeros')
        .required('El año es requerido')
  });
  const {
    control, //registrer
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    title: '',
    year:'',
    lang:'',
    time: '',
    // Asignación de validaciones
   resolver: yupResolver(movieSchema)

  });
  // useFieldArray:
  // relaciones de muchos a muchos, con más campos además
  // de las llaves primaras
  
  // Eliminar actor de listado
  
  // Agregar un nuevo actor
  
  // Valores de formulario que llena el usuario
  const [formData, setFormData] = useState(null);
  //Respuesta de crear o modificar
  const [responseData, setResponseData] = useState(null);
  
  const [error, setError] = useState('');

  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      // Establecer valores del formulario
      console.log(DataForm);
      setFormData(DataForm);
     
    } catch (e) {
      //Capturar error
    }
  };
  //Llamar al API para ejecutar Crear o modificar
  useEffect(() => {
        //Crear pelicula
        MovieService.createMovie(formData)
        .then(response => {
          console.log(response)
            setResponseData(response.data.results)
            setError(response.error)
        })
        .catch(error => {
          if (error instanceof SyntaxError) {
            console.log(error)
            setError(error)            
            throw new Error('Respuesta no válida del servidor')
          }
        });
  }, [formData]);
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);
  //Lista de Directores
  const [dataDirector, setDataDirector] = useState({});
  const [loadedDirector, setLoadedDirector] = useState(false);
  useEffect(() => {
    DirectorService.getDirectors()
      .then((response) => {
        console.log(response);
        setDataDirector(response.data.results);
        setLoadedDirector(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error)
          setLoadedDirector(false);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, []);
  //Lista de Generos
  const [dataGenres, setDataGenres] = useState({});
  const [loadedGenres, setLoadedGenres] = useState(false);
  useEffect(() => {
    GenreService.getGenres()
      .then((response) => {
        console.log(response);
        setDataGenres(response.data.results);
        setLoadedGenres(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error)
          setLoadedGenres(false);
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
          setError(error)
          setLoadedActors(false)
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, []);
  //Respuesta del API al crear 
  useEffect(() => {
    if (responseData != null) {
      toast.success(responseData, {
        duration: 4000,
        position: 'top-center'
      })
      // Redireccion a la tabla
      return navigate('/movie-table')
    }    
  }, [navigate, responseData])
  
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
                
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='title'
                    label='Título'
                    error={Boolean(errors.title)}
                    helperText={errors.title ? errors.title.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='year'
                    label='Año'
                    error={Boolean(errors.year)}
                    helperText={errors.year ? errors.year.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='time'
                    label='Minutos'
                    error={Boolean(errors.time)}
                    helperText={errors.time ? errors.time.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='lang'
                    label='Idioma'
                    error={Boolean(errors.lang)}
                    helperText={errors.lang ? errors.lang.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              {/* Lista de directores */}
              
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.director_id ? errors.director_id.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              {/* Lista de generos */}
              
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.genres ? errors.genres.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Typography variant='h6' gutterBottom>
                Actores
                <Tooltip title='Agregar Actor'>
                  <span>
                    <IconButton color='secondary' >
                      <AddIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Typography>
              {/* Array de controles de actor */}
              
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.actors ? errors.actors.message : ' '}
              </FormHelperText>
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
