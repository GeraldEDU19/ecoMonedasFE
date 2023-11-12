import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';

SelectMateriales.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};
export function SelectMateriales({ field, data }) {
  return (
    <>
      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
        <InputLabel id='Material'>Material</InputLabel>
        <Select
          {...field}
          labelId='Material'
          label='Material'
          defaultValue=''
          value={field.value}
        >
          {data &&
            data.map((material) => (
              <MenuItem key={material.ID} value={material.ID}>
                {material.Nombre} 
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
