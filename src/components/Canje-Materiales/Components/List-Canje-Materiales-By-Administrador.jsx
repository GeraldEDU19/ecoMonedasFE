import { useEffect, useState } from "react";
import * as React from 'react';
import CanjeMaterialesService from "../Services/Service-Canje-Materiales";
import UsuariosService from "../../Usuarios/Services/Service-Usuarios";

import { useNavigate } from 'react-router-dom';

 
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
export function ListCanjeMaterialesByAdministrador() {
  const navigate = useNavigate();
  const handleRowClick = (params) => {
    console.log("🚀 ~ file: List-Canje-Materiales-By-Administrador.jsx:28 ~ handleRowClick ~ params:", params)
    const canjeMaterialID = params.row.ID; // Obtener el ID del canje de materiales seleccionado
    navigate(`/CanjeDeMateriales/${canjeMaterialID}`);
  };
  //Resultado de consumo del API, respuesta
  const [dataAdministradores, setDataAdministradores] = useState(null);
  //Error del API
  const [errorAdministradores, setErrorAdministradores] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loadedAdministradores, setLoadedAdministradores] = useState(false);

  const [dataCanjeMateriales, setDataCanjeMateriales] = useState(null);
  //Error del API
  const [errorCanjeMateriales, setErrorCanjeMateriales] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loadedCanjeMateriales, setLoadedCanjeMateriales] = useState(false);


  useEffect(() => {
    setLoadedAdministradores(true);
    UsuariosService.getAdministradores()
      .then((response) => {
        setDataAdministradores(response.data.results);
        console.log(response.data);
        setErrorAdministradores(response.error);
        setLoadedAdministradores(true);
      })
      .catch((error) => {
        console.log(error);
        setErrorAdministradores(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);




  const [AdministradorID, setAdministradorID] = React.useState('');


 

  const handleChange = (event) => {
    const selectedAdminID = event.target.value;
    setAdministradorID(selectedAdminID);
    if (selectedAdminID) {
      loadCanjeMateriales(selectedAdminID);
    } else {
      setDataCanjeMateriales(null); // Reiniciar datos si el ID de administrador es nulo
    }
  };

  
  

  const loadCanjeMateriales = (AdministradorID) => {
    setLoadedCanjeMateriales(false);
    CanjeMaterialesService.getCanjeMaterialByAdministradorID(AdministradorID)
      .then((response) => {
        const formattedData = response.data.results.map((canje, index) => ({
          id: canje.ID + "-" + index,
          ID: canje.ID,
          FechaCanje: canje.FechaCanje,
          Cliente: canje.Cliente.PrimerNombre + " " + canje.Cliente.SegundoNombre + " " + canje.Cliente.PrimerApellido + " " + canje.Cliente.SegundoApellido,
          Administrador: canje.CentroDeAcopio.Administrador.PrimerNombre + " " + canje.CentroDeAcopio.Administrador.SegundoNombre + " " + canje.CentroDeAcopio.Administrador.PrimerApellido + " " + canje.CentroDeAcopio.Administrador.SegundoApellido,
          TotalEcoMonedas: canje.TotalEcoMonedas
        }));
        console.log("🚀 ~ file: List-Canje-Materiales-By-Administrador.jsx:95 ~ formattedData ~ response.data.results:", response.data.results)
        console.log("🚀 ~ file: List-Canje-Materiales-By-Administrador.jsx:95 ~ formattedData ~ formattedData:", formattedData)
        
        setDataCanjeMateriales(formattedData);
      })
      .catch((error) => {
        console.log(error);
        setErrorCanjeMateriales(error);
        throw new Error("Respuesta no válida del servidor");
      });    
}

  if (!loadedAdministradores) return <p>Cargando...</p>;
  if (errorAdministradores) return <p>Error: {errorAdministradores.message}</p>;
  return (
    
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Administrador</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={AdministradorID}
        label="Administrador"
        onChange={handleChange}
      >
        {dataAdministradores && dataAdministradores.map((item) => (
            <MenuItem key={item.ID} value={item.ID}>{item.PrimerNombre + " " + item.SegundoNombre + " " + item.PrimerApellido + " " + item.SegundoApellido}</MenuItem>
        ))}
    
      </Select>
    </FormControl>


      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={dataCanjeMateriales || []}
        columns={columns}
        onRowClick={handleRowClick}
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
