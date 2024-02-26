import React, { useEffect, useState } from 'react';

import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { Alert, Button, Container, Snackbar, Typography } from '@mui/material';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// import { useLoginMutation } from '../app/api/login/loginAPI';
import { useNavigate } from 'react-router-dom';


import LayoutPrincipal from '../componentes/plantillas/LayoutPrincipal';
import Slide from '@mui/material/Slide';
import Hoja from '../componentes/Hoja';
import useLogeado from 'app/hooks/useLogeado';
import { EstadosSesion } from '../funcionalidades/usuario/constantes/EstadosSesion';
import { login } from '../app/compartidos/autenticacion/API';

import { shallow } from 'zustand/shallow';
import { useStore } from 'HostApp/Autenticacion';

/**
 * Formulario de login
 * @return {JSX.Element}
 */
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const logeado = useLogeado();
  // const [login, loginResult] = useLoginMutation();

  const [open, setOpen] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [severidadMensaje, setSeveridadMensaje] = useState('success');

  const handleClose = () => {
    setOpen(false);
  };

  const sesionUsuario = useStore((state) => state.datos.sesionUsuario, shallow);
  const estadoSesion = useStore((state) => state.datos.estadoSesion, shallow);
  // const rolesDisponibles = useStore(
  //   (state) => state.datos.rolesDisponibles,
  //   shallow,
  // );
  const seleccionarRol = useStore((state) => state.acciones.seleccionarRol);
  const setLogin = useStore((state) => state.acciones.setLogin);

  const navigate = useNavigate();

  const manejarSeleccionarRol = async (rol) => {
    seleccionarRol(rol);
    navegarALaPaginaSiguiente();
  };

  const navegarALaPaginaSiguiente = () => {
    const paginaSiguiente = sesionUsuario?.urlRedireccion ?? '/';

    if (paginaSiguiente != null) {
      navigate(paginaSiguiente);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (logeado) {
      navegarALaPaginaSiguiente();
    }
  }, [logeado]);

  const onSubmit = async (data) => {
    try {
      await login(data).then((res) => {
        setLogin(res);
      });
    } catch (ex) {
      if (ex.status == 403) {
        setMensajeError('Usuario o contraseña incorrectos.');
      } else {
        setMensajeError('Error inesperado.');
      }
      setSeveridadMensaje('error');
      setOpen(true);
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      // enter
      handleSubmit(onSubmit)();
    }
  };

  // useEffect(() => {
  //   if (!loginResult.isUninitialized && loginResult.isSuccess) {
  //     console.log('Login!');
  //   }
  // }, [loginResult]);

  return (
    <React.Fragment>
      <LayoutPrincipal>
        <Container
          maxWidth={'sm'}
          sx={{
            paddingY: 1,
            flexGrow: 1,
            zIndex: 120,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'space-between'
          }}
        >
          <Hoja>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={severidadMensaje}
                sx={{ width: '100%' }}
              >
                {mensajeError}
              </Alert>
            </Snackbar>

            <Box
              sx={{
                zIndex: 120,
                borderRadius: '32px',
                textAlign: 'left',
                color: '#65738c',
                boxSizing: 'border-box',
                width: '100%',
                paddingY: 1,
                paddingX: 3
              }}
            >
              <Slide
                direction='up'
                in={
                  [
                    EstadosSesion.SESION_CERRADA,
                    EstadosSesion.NO_LOGEADO,
                    EstadosSesion.EXPIRADA
                  ].indexOf(estadoSesion) >= 0
                }
                mountOnEnter
                unmountOnExit
              >
                <Box
                  sx={{
                    zIndex: 120,
                    borderRadius: '32px',
                    textAlign: 'left',
                    color: '#65738c',
                    boxSizing: 'border-box',
                    width: '100%'
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '32px',
                      boxSizing: 'border-box',

                      textAlign: 'left',
                      color: '#65738c',

                      flexDirection: 'column',
                      alignContent: 'space-between',
                      display: 'flex',
                      alignItems: 'center',
                      '& > :not(style)': { m: 2, width: '100%' }
                    }}
                  >
                    <Typography variant='h4'>Ingresar</Typography>

                    <FormControl
                      sx={{ marginBottom: '1rem' }}
                      variant='standard'
                    >
                      <InputLabel htmlFor='standard-adornment-username'>
                        Usuario
                      </InputLabel>
                      <Input
                        id='standard-adornment-username'
                        onKeyUp={handleEnter}
                        type={'text'}
                        {...register('usuario', { required: true })}
                      />
                      {errors.usuario && (
                        <Typography variant='body2' sx={{ color: 'red' }}>
                          Campo requerido
                        </Typography>
                      )}
                    </FormControl>

                    <FormControl variant='standard'>
                      <InputLabel htmlFor='standard-adornment-password'>
                        Clave
                      </InputLabel>
                      <Input
                        id='standard-adornment-password'
                        onKeyUp={handleEnter}
                        type={'password'}
                        {...register('clave', { required: true })}
                      />
                      {errors.clave && (
                        <Typography variant='body2' sx={{ color: 'red' }}>
                          Campo requerido
                        </Typography>
                      )}
                    </FormControl>

                    <Button
                      variant='contained'
                      onClick={handleSubmit(onSubmit)}
                    >
                      Ingresar
                    </Button>
                  </Box>
                </Box>
              </Slide>

              {/*{estadoSesion === EstadosSesion.SELECCIONANDO_ROL && (*/}
              {/*  <Slide*/}
              {/*    direction="up"*/}
              {/*    in={estadoSesion === EstadosSesion.SELECCIONANDO_ROL}*/}
              {/*    mountOnEnter*/}
              {/*    unmountOnExit*/}
              {/*  >*/}
              {/*    <Box*/}
              {/*      sx={{*/}
              {/*        zIndex: 120,*/}
              {/*        borderRadius: '32px',*/}
              {/*        textAlign: 'left',*/}
              {/*        color: '#65738c',*/}
              {/*        boxSizing: 'border-box',*/}
              {/*        width: '100%',*/}
              {/*      }}*/}
              {/*    >*/}
              {/*      <Box*/}
              {/*        sx={{*/}
              {/*          borderRadius: '32px',*/}
              {/*          boxSizing: 'border-box',*/}
              {/*          textAlign: 'left',*/}
              {/*          color: '#65738c',*/}
              {/*          flexDirection: 'column',*/}
              {/*          alignContent: 'space-between',*/}
              {/*          display: 'flex',*/}
              {/*          alignItems: 'center',*/}
              {/*          '& > :not(style)': { m: 2, width: '100%' },*/}
              {/*        }}*/}
              {/*      >*/}
              {/*        <Typography variant="h4">*/}
              {/*          Por favor seleccione su rol*/}
              {/*        </Typography>*/}
              {/*        <Stack spacing={2}>*/}
              {/*          {rolesDisponibles.map((rol, idx) => {*/}
              {/*            return (*/}
              {/*              <Button*/}
              {/*                variant="contained"*/}
              {/*                key={idx}*/}
              {/*                onClick={() => {*/}
              {/*                  manejarSeleccionarRol(rol);*/}
              {/*                }}*/}
              {/*              >*/}
              {/*                {rol.descripcionRol}*/}
              {/*              </Button>*/}
              {/*            );*/}
              {/*          })}*/}
              {/*        </Stack>*/}
              {/*      </Box>*/}
              {/*    </Box>*/}
              {/*  </Slide>*/}
              {/*)}*/}
            </Box>
          </Hoja>
        </Container>
      </LayoutPrincipal>
    </React.Fragment>
  );
}
