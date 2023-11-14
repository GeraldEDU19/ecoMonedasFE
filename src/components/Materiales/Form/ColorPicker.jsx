import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  TextField,
  Popover,
  Box,
  Typography,
} from '@mui/material';
import { ChromePicker } from 'react-color';

const ColorPicker = ({ field }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

  const handleClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPickerPosition({ top: rect.bottom + window.scrollY, left: rect.right + window.scrollX });
    setShowColorPicker(!showColorPicker);
  };

  const handleClose = () => {
    setShowColorPicker(false);
  };

  return (
    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          {...field}
          label="Color"
          variant="outlined"
          size="small"
          InputProps={{
            readOnly: true,
            onClick: handleClick,
          }}
        />
        <Box
          sx={{
            width: '20px',
            height: '20px',
            marginLeft: '8px',
            backgroundColor: field.value || 'transparent',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </Box>

      {showColorPicker && (
        <Popover
          open={showColorPicker}
          anchorReference="anchorPosition"
          anchorPosition={{ top: pickerPosition.top, left: pickerPosition.left }}
          onClose={handleClose}
          PaperProps={{ sx: { width: 'auto', maxWidth: '300px', padding: '16px' } }}
        >
          <Box>
            <Typography variant="h6">Selecciona un color</Typography>
            <ChromePicker
              color={field.value}
              onChange={(color) => {
                field.onChange(color.hex);
              }}
            />
          </Box>
        </Popover>
      )}
    </FormControl>
  );
};

ColorPicker.propTypes = {
  field: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default ColorPicker;
