import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUploader from './ImageUploader.jsx';
import ColorPicker from './ColorPicker';
import MaterialService from '../Services/Service-Materiales.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function CreateMaterial() {
  const [created, setCreated] = useState(false);
  const [colorError, setColorError] = useState('');
  useEffect(() => {
    if (created) {
      toast.success('Material creado', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [created]);
  const navigate = useNavigate();

  const materialSchema = yup.object({
    Nombre: yup.string().required('El Nombre es requerido').min(2, 'Mínimo 2 caracteres'),
    Tipo: yup.string().required('El tipo es requerido'),
    Descripcion: yup.string().required('La descripción es requerida').min(10, 'Mínimo 10 caracteres'),
    Imagen: yup.mixed().test('required', 'La imagen es requerida', function (value) {
      // La siguiente condición verifica si el campo de imagen es un Blob o si es un archivo seleccionado
      return value instanceof File || (value && value[0] instanceof File);
    }),
    UnidadMedida: yup.string().required('La unidad de medida es requerida'),
    Color: yup.string().required('El color es requerido'),
    Precio: yup.number().typeError('Solo acepta números').required('El precio es requerido').positive('Solo acepta números positivos'),
  });

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      Nombre: '',
      Tipo: '',
      Descripcion: '',
      Imagen: '',
      UnidadMedida: '',
      Color: '',
      Precio: 0.0,
    },
    resolver: yupResolver(materialSchema),
  });

  const [error, setError] = useState('');

  const onSubmit = (formData) => {
    try {
      if (materialSchema.isValid()) {
        const dataToSubmit = new FormData();

        // Agrega las demás entradas al FormData
        Object.entries(formData).forEach(([key, value]) => {
          dataToSubmit.append(key, value);
        });

        // Asegúrate de que el valor de 'Imagen' sea un Blob (archivo) en lugar de una cadena Base64
        dataToSubmit.set('Imagen', formData.Imagen);


        MaterialService.createMaterial(dataToSubmit)
          .then((response) => {
            console.log(response)
            if (typeof response.data === "string" && (response.data).startsWith("Error: Duplicate entry")) {
              setColorError('El color ya ha sido seleccionado');
              return;
            } else if (response) setCreated(true);
            setTimeout(() => {
              navigate('/materiales');
            }, 2000);
          })
          .catch((error) => {
            setError(error);
            console.error('Error creating material:', error);
          });
      }
    } catch (error) {
      console.error('Error in material creation process:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('Imagen', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (color) => {
    setValue('Color', color.hex);
  };


  const onError = (errors, e) => console.log(errors, e);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Typography variant="h5" gutterBottom>
          Crear Material
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Nombre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Nombre"
                    label="Nombre"
                    error={Boolean(errors.Nombre)}
                    helperText={errors.Nombre ? errors.Nombre.message : ' '}
                  />
                )}
              />
            </FormControl>

            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Tipo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Tipo"
                    label="Tipo"
                    error={Boolean(errors.Tipo)}
                    helperText={errors.Tipo ? errors.Tipo.message : ' '}
                  />
                )}
              />
            </FormControl>

            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Descripcion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Descripcion"
                    label="Descripción"
                    error={Boolean(errors.Descripcion)}
                    helperText={errors.Descripcion ? errors.Descripcion.message : ' '}
                  />
                )}
              />
            </FormControl>


            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="UnidadMedida"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="UnidadMedida"
                    label="Unidad de medida"
                    error={Boolean(errors.UnidadMedida)}
                    helperText={errors.UnidadMedida ? errors.UnidadMedida.message : ' '}
                  />
                )}
              />
            </FormControl>

            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Precio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Precio"
                    label="Precio"
                    error={Boolean(errors.Precio)}
                    helperText={errors.Precio ? errors.Precio.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/* Columna derecha */}
          <Grid item xs={0} sm={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 0 }}>
              <Controller
                name="Imagen"
                control={control}
                render={({ field, fieldState }) => (
                  <ImageUploader field={field} fieldState={fieldState} onChange={handleFileChange} />
                )}
              />
            </FormControl>


            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Color"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <ColorPicker field={field} fieldState={fieldState} onChange={handleColorChange} />
                    {colorError && (
                      <Typography color="error" variant="caption" gutterBottom>
                        {colorError}
                      </Typography>
                    )}
                  </>
                )}
              />
            </FormControl>

            <Grid item xs={12} ml={2} mt={3}>
              <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
                Guardar
              </Button>
            </Grid>
          </Grid>


        </Grid>
      </form>
    </>
  );


}
