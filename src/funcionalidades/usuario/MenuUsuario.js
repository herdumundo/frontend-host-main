import React, { useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import { IconButton, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import useLogeado from 'app/hooks/useLogeado';
import { useStore } from 'HostApp/Autenticacion';
import logout from '../../app/compartidos/autenticacion/API/logout';

/**
 * Componente de menú de usuario
 * @return {JSX.Element}
 */
export const MenuUsuario = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const logeado = useLogeado();

  const open = Boolean(anchorEl);

  const estado = useStore((state) => state);
  const sesionUsuario = useStore((state) => state.datos.sesionUsuario, shallow);

  const rolSeleccionado = useStore(
    (state) => state.datos.rolSeleccionado,
    shallow
  );
  const cambiarRol = useStore((state) => state.acciones.cambiarRol);
  const cerrarSesion = useStore((state) => state.acciones.cerrarSesion);

  // const [logout] = useLogoutMutation();
  //
  const handleClick = (event) => {
    if (logeado) setAnchorEl(event.currentTarget);
  };

  const manejarCambiarRol = useCallback(() => {
    console.log(estado);
    cambiarRol();
  }, [cambiarRol]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    cerrarSesion();
  };

  console.log(logeado, sesionUsuario);
  return (
    <React.Fragment>
      <Typography component='div'>
        <Typography variant='body2' fontWeight={'bold'}>
          {logeado && sesionUsuario.datosUsuario.nombreUsuario}
        </Typography>
        {/*<Typography variant="subtitle2" fontWeight={'bold'}>*/}
        {/*  {logeado && rolSeleccionado.descripcionRol}*/}
        {/*</Typography>*/}
      </Typography>
      <IconButton variant='' disableRipple={true} onClick={handleClick}>
        <Avatar
          variant='rounded'
          sx={{ bgcolor: grey[500], width: 48, height: 48 }}
        >
          {(logeado && sesionUsuario.datosUsuario.nombreUsuario[0]) || (
            <PersonIcon />
          )}
        </Avatar>
      </IconButton>

      {/* <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        > */}
      {/* <MenuItem onClick={manejarCambiarRol}>Cambiar rol</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem> */}
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            navigate('/perfil');
          }}
        >
          <Avatar /> Mi cuenta
        </MenuItem>
        <Divider />
        {/*<MenuItem onClick={manejarCambiarRol}>*/}
        {/*  <ListItemIcon>*/}
        {/*    <Settings fontSize="small" />*/}
        {/*  </ListItemIcon>*/}
        {/*  Cambiar roles*/}
        {/*</MenuItem>*/}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
