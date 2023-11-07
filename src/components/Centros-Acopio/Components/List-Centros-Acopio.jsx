import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { Link } from "react-router-dom";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CentroAcopioService from "../Services/Service-Centros-Acopio";

export function ListCentroAcopio() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    CentroAcopioService.getCentros()
      .then((response) => {
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setLoaded(true);
      });
  }, []);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;



  return (
    <Container>
      <Grid container spacing={3}>
        {data && data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.ID}>
            <Card sx={{ 
              height: "100%", display: "flex", flexDirection: "column", 
              border: "1px solid lightgrey"
              }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.Nombre}
                </Typography>
                <List>
                  {item.Materiales && item.Materiales.map((material) => (
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
              </CardContent>
              <Button
                variant="contained"
                color="info" // Cambiar a color "info" para un tono de celeste pastel
                sx={{ marginTop: "auto" }}
                component={Link} to={`/centroAcopio/${item.ID}`} aria-label='Detalle' 
                startIcon={<ErrorOutlineIcon />}
              >
                Información sobre el centro de Acopio
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
