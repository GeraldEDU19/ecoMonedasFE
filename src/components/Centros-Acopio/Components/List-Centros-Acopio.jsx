import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Button, Box } from '@mui/material';
import { Link } from "react-router-dom";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import CentroAcopioService from "../Services/Service-Centros-Acopio";
import { UserContext } from "../../../context/UserContext";

export function ListCentroAcopio() {

  const { user, decodeToken, autorize } = useContext(UserContext)
    const [userData, setUserData] = useState(decodeToken())
    useEffect(() => {
      setUserData(decodeToken())
    }, [user])

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

  const renderCentros = () => {
    return (
      <Grid container spacing={3}>
        {data && data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.ID}>
            <Card sx={{
              height: "100%", display: "flex", flexDirection: "column",
              border: "1px solid lightgrey",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
              }
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
              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
                <Button
                  variant="contained"
                  color="info"
                  sx={{ flex: 1, marginRight: "0.5rem", alignSelf: "flex-end" }}
                  component={Link} to={`/centroAcopio/${item.ID}`} aria-label='Detalle'
                  startIcon={<ErrorOutlineIcon />}
                >
                  Detalles
                </Button>
                {user && autorize({ allowedRoles: ["Administrador"] }) && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ flex: 1, alignSelf: "flex-end" }}
                  component={Link} to={`/centroAcopio/actualizar/${item.ID}`}
                  startIcon={<ErrorOutlineIcon />}
                  disabled={!loaded} // Deshabilitar el botón si no hay datos cargados
                >
                  Actualizar
                </Button>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      {/* Agrega el botón de creación en el medio con un espacio */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1rem", marginBottom: "1rem" }}>
      {user && autorize({ allowedRoles: ["Administrador"] }) && (
        <Button
          variant="contained"
          color="success"
          component={Link} to={`/centroAcopio/crear/`} aria-label='Crear Centro de Acopio'
          startIcon={<AddIcon />}
        >
          Crear Centro de Acopio
        </Button>
        )}
      </Box>
      {renderCentros()}
    </Container>
  );
}

