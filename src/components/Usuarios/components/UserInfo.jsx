import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Typography, Grid, Paper } from '@mui/material';
import { UserContext } from '../../../context/UserContext';

const UserProfile = () => {
    const [user, setUser] = useState('')

    const { userContext, decodeToken, autorize } = useContext(UserContext)
    const [userData, setUserData] = useState(decodeToken())
    useEffect(() => {
        setUserData(decodeToken())
        setUser(userData)
    }, [user])



  const containerStyle = {
    marginTop: '1.5rem',
  };

  const paperStyle = {
    padding: '1rem',
    marginBottom: '2rem',
  };

  const subtitleStyle = {
    marginBottom: '0.5rem',
  };

  return (
    <Container maxWidth="md" style={containerStyle}>
      <Typography variant="h4" gutterBottom>
        Perfil de Usuario
      </Typography>
      <Paper elevation={3} style={paperStyle}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" style={subtitleStyle}>
              Primer Nombre: {user.PrimerNombre}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" style={subtitleStyle}>
              Segundo Nombre: {user.SegundoNombre}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" style={subtitleStyle}>
              Primer Apellido: {user.PrimerApellido}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" style={subtitleStyle}>
              Segundo Apellido: {user.SegundoApellido}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" style={subtitleStyle}>
              Teléfono: {user.Telefono}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" style={subtitleStyle}>
              Dirección - Provincia: {user.DireccionProvincia}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" style={subtitleStyle}>
              Dirección - Cantón: {user.DireccionCanton}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" style={subtitleStyle}>
              Dirección - Distrito: {user.DireccionDistrito}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Button component='a' href='/usuario/cambiarContrasenna'>
                <Typography textAlign="center">Cambiar Contraseña</Typography>
    </Button>
    </Container>
  );
};

export default UserProfile;
