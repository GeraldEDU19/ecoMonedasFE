import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, MenuList } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useContext, useState } from 'react';
import MovieIcon from '@mui/icons-material/Movie';
import SettingsIcon from '@mui/icons-material/Settings';
import RecyclingIcon from '@mui/icons-material/Recycling';
import { UserContext } from '../../context/UserContext';
import { useEffect } from 'react';

function Header() {
  const { user, decodeToken, autorize } = useContext(UserContext)
  const [userData, setUserData] = useState(decodeToken())
  useEffect(() => {
    setUserData(decodeToken())
  }, [user])
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{
      backgroundColor: 'primary.main',
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RecyclingIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EcoRecicla
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
 
              <MenuItem component='a' href='/materiales/'>
                <Typography textAlign="center"></Typography>
              </MenuItem>
              <MenuItem component='a' href='/centroAcopio/'>
                <Typography textAlign="center"></Typography>
              </MenuItem>
            </Menu>
          </Box>
          <MovieIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          <Typography
            variant="p"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EcoRecicla
          </Typography>


          {/* Menu de Matenimientos */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title="Mantenimientos">
              <IconButton onClick={handleOpenNavMenu} sx={{ p: 0 }}>
                <Avatar variant="rounded">
                  <SettingsIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {user && autorize({ allowedRoles: ["Administrador"] }) && (
              <MenuItem component='a' href='/usuario/crearAdministrador'>
                    <Typography textAlign="center">Crear Administrador</Typography>
                  </MenuItem>
                  )}
                {user && autorize({ allowedRoles: ["Administrador"] }) && (
              <MenuItem component='a' href='/usuario/lista'>
                    <Typography textAlign="center">Lista Usuarios</Typography>
                  </MenuItem>
                  )}
              <MenuItem component='a' href='/materiales/'>
                <Typography textAlign="center">Lista Materiales</Typography>
              </MenuItem>
              <MenuItem component='a' href='/centroAcopio/'>
                <Typography textAlign="center">Lista Centro de acopio</Typography>
              </MenuItem>

              {user && autorize({ allowedRoles: ["Cliente"] }) && (
              <MenuItem component='a' href='/canjesMaterialesByCliente/'>
                <Typography textAlign="center">Historial de Canjes</Typography>
              </MenuItem>
              )}
    
              {user && autorize({ allowedRoles: ["Administrador"] }) && (
              <MenuItem component='a' href='/canjesMaterialesByAdministrador/'>
                <Typography textAlign="center">Historial de Canjes Facturados</Typography>
              </MenuItem>
              )}
              {user && autorize({ allowedRoles: ["Administrador"] }) && (


                <MenuItem component='a' href='/material/crear/'>
                  <Typography textAlign="center">Crear Material</Typography>
                </MenuItem>

              )}
              {user && autorize({ allowedRoles: ["Administrador"] }) && (
                <MenuItem component='a' href='/centroAcopio/crear/'>
                  <Typography textAlign="center">Crear Centro de acopio</Typography>
                </MenuItem>
              )}
              {user && autorize({ allowedRoles: ["Administrador"] }) && (
                <MenuItem component='a' href='/facturar/'>
                  <Typography textAlign="center">Facturar</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          {/* Menu de Matenimientos */}

          {/* Menu Usuarios */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Usuario">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon style={{ fill: 'white' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!userData && (
                <MenuList>
                  <MenuItem component='a' href='/usuario/iniciosesion'>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                  <MenuItem component='a' href='/usuario/crear'>
                    <Typography textAlign="center">Registrarse</Typography>
                  </MenuItem>
                </MenuList>
              )}
              {userData && (
                <MenuList>
                  <MenuItem component='a' href='/usuario/informacion'>
                    <Typography variant='subtitle1' gutterBottom>
                      {userData?.CorreoElectronico}
                    </Typography>
                  </MenuItem>
                  <MenuItem color='secondary' component='a' href='/usuario/cerrarsesion'>
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                </MenuList>
              )}
            </Menu>
          </Box>
          {/* Menu Usuarios */}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;