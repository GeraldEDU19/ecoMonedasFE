import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Box,
} from '@mui/material';

const ImageUploader = ({ field, fieldState }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Verifica si field.value es una cadena (datos base64) y establece previewImage en consecuencia
    if (typeof field.value === 'string') {
      setPreviewImage(field.value);
    } else {
      // Suponiendo que field.value es un objeto File, actualiza previewImage e imageFile
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(field.value);
      setImageFile(field.value);
    }
  }, [field.value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImageFile(file);
        field.onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
      <Input
        id="fileInput"
        type="file"
        inputProps={{ accept: 'image/*', style: { display: 'none' } }}
        onChange={handleFileChange}
        error={Boolean(fieldState?.error)}
        sx={{ display: 'none' }}
      />
      <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
        <Box
          component="div"
          textAlign="center"
          marginTop="8px"
          width="250px"
          height="250px"
          border="2px dashed #ccc"
          borderRadius="4px"
          overflow="hidden"
        >
          {!previewImage && (
            <p style={{ paddingTop: '100px', color: '#777', fontSize: '16px' }}>
              Selecciona una imagen
            </p>
          )}
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}
        </Box>
      </label>
      <FormHelperText>{fieldState?.error?.message}</FormHelperText>
    </FormControl>
  );
};

ImageUploader.propTypes = {
  field: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }).isRequired,
  fieldState: PropTypes.shape({
    error: PropTypes.object,
  }),
};

export default ImageUploader;
