import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';SelectAdministrador
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectAdministrador.propTypes = {
      data: PropTypes.array,
      field: PropTypes.object,
      onChange: PropTypes.func,
    };
export function SelectAdministrador({ field, data, onChange}) {
  return (
    <>
      <>
        <InputLabel id='Administrador'>Administrador</InputLabel>
        <Select
          {...field}
          labelId='Administrador'
          label='Administrador'
          defaultValue=''
          value={field.value}
          onChange={onChange}
        >
          {data &&
            data.map((administrador) => (
              <MenuItem key={administrador.ID} value={administrador.ID}>
                {administrador.PrimerNombre} {administrador.PrimerApellido}
              </MenuItem> 
            ))}
        </Select>
      </>
    </>
  );
}
