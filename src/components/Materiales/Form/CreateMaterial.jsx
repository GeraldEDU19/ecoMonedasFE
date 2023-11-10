import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useForm, Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import MaterialService from '../Services/Service-Materiales';
import { toast } from 'react-hot-toast';

//https://www.npmjs.com/package/@hookform/resolvers

export function CreateMaterial() {
  const navigate = useNavigate();

  // Esquema de validación
  const materialSchema = yup.object({
    Nombre: yup
      .string()
      .required('El Nombre es requerido')
      .min(2, 'El Nombre debe tener como mínimo 2 caracteres'),
    Tipo: yup
      .string()
      .required('El tipo es requerido'),
    Descripcion: yup
      .string()
      .required('La descripción es requerida')
      .min(10, 'La descripción debe tener como mínimo 10 caracteres'),
    Imagen: yup
      .string()
      .required('La imagen es requerida'),
    UnidadMedida: yup
      .string()
      .required('La unidad de medida es requerida'),
    Color: yup
      .string()
      .required('El color es requerido'),
    Precio: yup
      .number()
      .typeError('Solo acepta números')
      .required('El precio es requerido')
      .positive('Solo acepta números positivos'),
  });
  const {
    control,
    handleSubmit,

   
  /*   getValues, */
    formState: { errors },
  } = useForm({
    defaultValues: {
      Nombre: '',
      Tipo: '',
      Descripcion: '',
      Imagen: '',
      UnidadMedida: '',
      Color: '',
      Precio: 0.0
       ,
     
    },
    // Asignación de validaciones
    resolver: yupResolver(materialSchema),
  });
  //Definir seguimiento de actores con Watch
  
  /* const handleInputChange=(index, name, value)=>{
    //actors.1.role='Rol 1'
    setValue(name,value)
    //Obtener los valores del formulario
    const values=getValues()
    console.log(values.actors[index])
    let total='Reparto: '
    values.actors.map((item)=>{
      total+=`${item.role} `
    })
    setValue('total',total)
  } */
  // useFieldArray:
  // relaciones de muchos a muchos, con más campos además
  // de las llaves primaras
 
  
 
  const [error, setError] = useState('');

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log('Formulario:');
    console.log(DataForm);
  
    try {
      if (materialSchema.isValid()) {
        // Create material
        MaterialService.createMaterial(DataForm)
          .then((response) => {
            console.log(response);
            setError(response.error);
    
            // Response to user for creation
            if (response.data.results != null) {
              toast.success(response.data.results, {
                duration: 4000,
                position: 'top-center',
              });
            }
    
            // Redirect to the table regardless of the response
         
            navigate('/materiales?created=true');
          })
          .catch((error) => {
            console.error("Error creating material:", error);
            // Handle error (e.g., show error message)
          });
      }
    } catch (error) {
      console.error("Error in material creation process:", error);
      // Handle synchronous errors
    }
  };

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);
  
  
  
  

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Crear Material
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
                name='Tipo'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='Tipo'
                    label='Tipo'
                    error={Boolean(errors.Tipo)}
                    helperText={errors.Tipo ? errors.Tipo.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='Descripcion'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='Descripcion'
                    label='Descripcion'
                    error={Boolean(errors.Descripcion)}
                    helperText={errors.Descripcion ? errors.Descripcion.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='Imagen'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='Imagen'
                    label='Imagen'
                    error={Boolean(errors.Imagen)}
                    helperText={errors.Imagen ? errors.Imagen.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
         
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='UnidadMedida'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='UnidadMedida'
                    label='Unidad de medida'
                    error={Boolean(errors.UnidadMedida)}
                    helperText={errors.UnidadMedida ? errors.UnidadMedida.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='Color'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='Color'
                    label='Color'
                    error={Boolean(errors.Color)}
                    helperText={errors.Color ? errors.Color.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='Precio'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='Precio'
                    label='Precio'
                    error={Boolean(errors.Precio)}
                    helperText={errors.Precio ? errors.Precio.message : ' '}
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
     
    </>
  );
}
