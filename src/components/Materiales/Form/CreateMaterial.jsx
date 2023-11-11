import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { TextField, Button,  Input, InputLabel, FormHelperText  } from '@mui/material';
import { useForm, Controller} from 'react-hook-form';
import { ChromePicker } from 'react-color'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';


import MaterialService from '../Services/Service-Materiales';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types'; 

const ImageUploader = ({ field, fieldState }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        field.onChange(reader.result); // Guarda la imagen en Base64 en el estado
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    // Simular un clic en el input de tipo file al hacer clic en el botón
    document.getElementById('fileInput').click();
  };

  return (
    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
      <InputLabel htmlFor="fileInput">Imagen</InputLabel>
      <Input
        id="fileInput"
        type="file"
        inputProps={{ accept: 'image/*', style: { display: 'none' } }}
        onChange={handleFileChange}
        error={Boolean(fieldState?.error)}
        sx={{ display: 'none' }} // Ocultamos el input real
      />
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Seleccionar Imagen
      </Button>
      {previewImage && (
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <img
            src={previewImage}
            alt="Preview"
            style={{
              maxWidth: '100%',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginTop: '8px',
            }}
          />
        </div>
      )}
      <FormHelperText>{fieldState?.error?.message}</FormHelperText>
    </FormControl>
  );
};

ImageUploader.propTypes = {
  field: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  fieldState: PropTypes.shape({
    error: PropTypes.object,
  }),
};


const ColorPicker = ({ field }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

  const handleClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPickerPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    setShowColorPicker(!showColorPicker);
  };

  const handleClose = () => {
    setShowColorPicker(false);
  };

  return (
    <FormControl variant='standard' fullWidth sx={{ m: 1, position: 'relative' }}>
      <TextField
        {...field}
        label="Color"
        variant="outlined"
        size="small"
        InputProps={{
          readOnly: true,
        }}
        onClick={handleClick}
      />

      {showColorPicker && (
        <div
          style={{
            position: 'fixed',
            zIndex: '1000',
            top: pickerPosition.top + 'px',
            left: pickerPosition.left + 'px',
          }}
        >
          <ChromePicker
            color={field.value}
            onChange={(color) => {
              field.onChange(color.hex);
            }}
            onChangeComplete={handleClose}
          />
        </div>
      )}
    </FormControl>
  );
};

ColorPicker.propTypes = {
  field: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  fieldState: PropTypes.shape({
    error: PropTypes.object,
  }),
};

ColorPicker.propTypes = {
  field: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    // Agrega otras propiedades necesarias según sea necesario
  }).isRequired,
  fieldState: PropTypes.shape({
    error: PropTypes.object, // O ajusta según tus necesidades
  }),
};

export function CreateMaterial() {
  const [created, setCreated] = useState(false);
  useEffect(() => {
    if (created) {
      toast.success('Material creado', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [created]);
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

            // Response to user for creation
            if(response) setCreated(true)
            setTimeout(() => {
              navigate('/materiales');
            }, 2000);
          })
          .catch((error) => {
            setError(error);
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
        <Typography variant='h5' gutterBottom>
          Crear Material
        </Typography>
  
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
  
          <Grid item xs={12} sm={6}>
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
  
          <Grid item xs={12}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='Descripcion'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='Descripcion'
                    label='Descripción'
                    error={Boolean(errors.Descripcion)}
                    helperText={errors.Descripcion ? errors.Descripcion.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Imagen"
                control={control}
                render={({ field, fieldState }) => (
                  <ImageUploader field={field} fieldState={fieldState} />
                )}
              />
            </FormControl>
          </Grid>
  
          <Grid item xs={12} sm={6}>
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
  
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='Color'
                control={control}
                render={({ field, fieldState }) => (
                  <ColorPicker field={field} fieldState={fieldState} />
                )}
              />
            </FormControl>
          </Grid>
  
          <Grid item xs={12} sm={6}>
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
  
          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='secondary' sx={{ mt: 2 }}>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
  
}
