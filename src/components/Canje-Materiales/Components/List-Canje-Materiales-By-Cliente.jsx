import { useEffect, useState } from "react";
import * as React from 'react';
import CanjeMaterialesService from "../Services/Service-Canje-Materiales";
import UsuariosService from "../../Usuarios/Services/Service-Usuarios";
import Typography from "@mui/material/Typography";

 
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {DataGrid} from '@mui/x-data-grid';

const columns = [
  // Columns representing the fields from the CanjesMateriales table
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'FechaCanje', headerName: 'Fecha de Canje', width: 130 },
  { field: 'Cliente', headerName: 'Cliente', width: 200 },
  { field: 'Administrador', headerName: 'Administrador', width: 200 },
  { field: 'TotalEcoMonedas', headerName: 'Total EcoMonedas', width: 150 },
];
export function ListCanjeMaterialesByCliente() {
  //Resultado de consumo del API, respuesta
  const [dataClientes, setDataClientes] = useState(null);
  //Error del API
  const [errorClientes, setErrorClientes] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loadedClientes, setLoadedClientes] = useState(false);

  const [dataCanjeMateriales, setDataCanjeMateriales] = useState(null);
  //Error del API
  const [errorCanjeMateriales, setErrorCanjeMateriales] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loadedCanjeMateriales, setLoadedCanjeMateriales] = useState(false);


  useEffect(() => {
    setLoadedClientes(true);
    UsuariosService.getUsuarios()
      .then((response) => {
        setDataClientes(response.data.results);
        console.log(response.data);
        setErrorClientes(response.error);
        setLoadedClientes(true);
      })
      .catch((error) => {
        console.log(error);
        setErrorClientes(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);




  const [ClienteID, setClienteID] = React.useState('');


 

  const handleChange = (event) => {
    setClienteID(event.target.value);
    loadCanjeMateriales(event.target.value)
  };

  const loadCanjeMateriales = (ClienteID) => {
    setLoadedCanjeMateriales(true);
    CanjeMaterialesService.getCanjeMaterialByClienteID(ClienteID)
      .then((response) => {
        console.log("🚀 ~ file: List-Canje-Materiales-By-Cliente.jsx:82 ~ formattedData ~ response.data.results:", response.data.results)
        const formattedData = response.data.results.map((canje) => ({
          id: canje.ID,
          FechaCanje: canje.FechaCanje,
          Cliente: canje.Cliente.PrimerNombre + " " + canje.Cliente.SegundoNombre + " " + canje.Cliente.PrimerApellido + " " + canje.Cliente.SegundoApellido,
          Administrador: canje.CentroDeAcopio.Administrador.PrimerNombre + " " + canje.CentroDeAcopio.Administrador.SegundoNombre + " " + canje.CentroDeAcopio.Administrador.PrimerApellido + " " + canje.CentroDeAcopio.Administrador.SegundoApellido,
          TotalEcoMonedas: canje.TotalEcoMonedas
        }));
        
        setDataCanjeMateriales(formattedData);
      })
      .catch((error) => {
        console.log(error);
        setErrorCanjeMateriales(error);
        throw new Error("Respuesta no válida del servidor");
      });    
}

  if (!loadedClientes) return <p>Cargando...</p>;
  if (errorClientes) return <p>Error: {errorClientes.message}</p>;
  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={ClienteID}
        label="Cliente"
        onChange={handleChange}
      >
        {dataClientes && dataClientes.map((item) => (
            <MenuItem key={item.ID} value={item.ID}>{item.PrimerNombre + " " + item.SegundoNombre + " " + item.PrimerApellido + " " + item.SegundoApellido}</MenuItem>
        ))}
    
      </Select>
    </FormControl>


      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={dataCanjeMateriales || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  </Box>
  );
}
