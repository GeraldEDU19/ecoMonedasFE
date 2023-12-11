import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import UserService from '../Services/Service-Usuarios';

const UserTable = () => {
  const columns = [
    { field: 'CorreoElectronico', headerName: 'Correo Electrónico', width: 200 },
    { field: 'PrimerNombre', headerName: 'Primer Nombre', width: 150 },
    { field: 'SegundoNombre', headerName: 'Segundo Nombre', width: 150 },
    { field: 'PrimerApellido', headerName: 'Primer Apellido', width: 150 },
    { field: 'SegundoApellido', headerName: 'Segundo Apellido', width: 150 },
    { field: 'Identificacion', headerName: 'Identificación', width: 150 },
    { field: 'Telefono', headerName: 'Teléfono', width: 150 },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    UserService.getUsuarios()
      .then((response) => {
        // Ensure each row has a unique 'id' property
        const rowsWithId = response.data.results.map((row) => ({
          ...row,
          id: row.ID, // Assuming 'ID' is the unique identifier
        }));
        setRows(rowsWithId);
      })
      .catch((error) => {
        console.log(error);
        throw new Error('Respuesta no válida del servidor');
      });
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default UserTable;
