import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import ServiceCentroAcopio from "../Services/Service-Centros-Acopio";

export function DetailCentroAcopio() {
  const routeParams = useParams()
  console.log(routeParams)

  // Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  // Error del API
  const [error, setError] = useState('');
  // Booleano para establecer si se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ServiceCentroAcopio.getCentroById(routeParams.id)
      .then(response => {
        setData(response.data);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch(error => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, [routeParams.id]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container component='main' sx={{ mt: 8, mb: 2 }}>
      {data && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Typography variant='h4' component='h1' gutterBottom>
              {data.results.Nombre}
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              Provincia: {data.results.DireccionProvincia}
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              Cantón: {data.results.DireccionCanton}
            </Typography>
            <Typography component='span' variant='subtitle1' display='block'>
              
                Dirección completa: {data.results.DireccionExacta}
              
            </Typography>
            <Typography component='span' variant='subtitle1' display='block'>
             
                Teléfono:
              {' '}
              {data.results.Telefono}
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              Horario de atención: {data.results.HorarioAtencion}
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              Administrador: {data.results.Administrador.PrimerNombre} {data.results.Administrador.PrimerApellido}
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              Lista de materiales:
            </Typography>
            <List>
              {data.results.Materiales && data.results.Materiales.map((material) => (
                <ListItem
                  key={material.ID}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <ListItemIcon>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                  <ListItemText primary={material.Nombre} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={5}>
            {/* Agrega contenido para la columna derecha si es necesario */}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
