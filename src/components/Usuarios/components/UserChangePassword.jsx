import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Typography, Paper, TextField } from '@mui/material';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from '../Services/Service-Usuarios'
import { UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false)

    const { userContext, decodeToken, autorize } = useContext(UserContext)
    const [userData, setUserData] = useState(decodeToken())
    useEffect(() => {
        setUserData(decodeToken())
        setUser(userData)
    }, [user])

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const validationSchema = yup.object({
    newPassword: yup.string().required('Nueva Contraseña es requerida'),
    confirmPassword: yup
      .string()
      .oneOf([newPassword], 'Las contraseñas deben coincidir')
      .required('Confirmar Contraseña es requerida'),
  });

  useEffect(() => {
    if (passwordChanged) {
      toast.success('Contraseña Cambiada, Cerrando sesión...', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [passwordChanged]);


  const handlePasswordChange = () => {
    validationSchema
      .validate({ newPassword, confirmPassword })
      .then(() => {
        UserService.changePassword({Contrasenna: newPassword, ID: user.ID})
        .then(response => {
          console.log(response)
          setPasswordChanged(true)
          setTimeout(() => {
            navigate('/usuario/cerrarsesion')
          }, 2000);
        })
        .catch(error => {
          if (error instanceof SyntaxError) {
            console.log(error)
            setError(error)
            throw new Error('Respuesta no válida del servidor')
          }
        });
        
        setError('');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const paperStyle = {
    padding: '1rem',
    marginBottom: '2rem',
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Cambiar Contraseña
      </Typography>
      <Paper elevation={3} style={paperStyle}>
        <TextField
          label="Nueva Contraseña"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={Boolean(error)}
          helperText={error || ' '}
          margin="normal"
        />
        <TextField
          label="Confirmar Contraseña"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={Boolean(error)}
          helperText={error || ' '}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handlePasswordChange}>
          Cambiar Contraseña
        </Button>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
