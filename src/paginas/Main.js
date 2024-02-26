import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import GavelIcon from '@mui/icons-material/Gavel';

import { useNavigate } from 'react-router-dom';
import Layout from '../componentes/plantillas/ContenedorPrincipal';
import useLogeado from 'app/hooks/useLogeado';
import { useStore, ObtenerDatosAplicaciones } from 'HostApp/Autenticacion';


/**
 * Componente principal de navegación de aplicaciones
 * @return {JSX.Element}
 */
export default function Main() {
  const navigate = useNavigate();

  // const datosLogin = useSelector((state) => state.host.usuario);
  const state = useStore((state) => state.datos);

  state.sesionUsuario?.tokenAcceso && ( async () => {
    const resultado = await ObtenerDatosAplicaciones([72, 73, 74, 75, 76, 77]);

    console.log( "Aplicaciones", resultado );
  })();

  const logeado = useLogeado();
  const [appsFiltradas, setAppsFiltradas] = useState([]);

  const contieneSigaf = (() => {
    const appsId = [8001, 8002, 8003, 8004, 8005, 8006];

    try {
      for (const aplicacion of state.sesionUsuario?.datosUsuario.aplicaciones) {

        if (appsId.includes(aplicacion.appId)) {
          return true;
        }
      }
    } catch (ex) {

    }

    return false;
  })();

  const apps = [
    {
      nombre: 'Gestión de partes',
      url: '/gex',
      appId: 26
    },

    {
      nombre: 'EjemploApp',
      url: '/ejemploApp',
      appId: 26
    }
  ];

  useEffect(() => {
    if (!logeado) return;

    const localAppsFiltradas = apps.filter((e) => {
      const datosUsuario = state.sesionUsuario.datosUsuario;

      return datosUsuario?.aplicaciones?.find((appUsuario) => {
        return (
          appUsuario.appId === e.appId &&
          appUsuario.roles.findIndex(
            (rol) => state.rolSeleccionado?.rolId === rol.rolId
          ) >= 0
        );
      });
    });

    setAppsFiltradas(localAppsFiltradas);

    // if (localAppsFiltradas.length == 1) {
    //   console.log('Redireccionando', datosLogin, localAppsFiltradas[0].url);
    //   setTimeout(() => {
    //     location.assign(localAppsFiltradas[0].url);
    //   }, 500);
    // }
  }, [state.sesionUsuario]);

  return (
    <React.Fragment>
      <Layout titulo='Panel principal'>
        <Grid container sx={{ paddingY: 2 }}>

          {
            contieneSigaf &&
            <Grid item xs={12} md={3} lg={2} key={'/sigaf'}>
              <Box
                sx={{
                  border: '1px solid #65738c',
                  height: '150px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: '1rem 2rem 0rem',
                  cursor: 'pointer',
                  margin: '1pt',
                  borderRadius: 4
                }}
                onClick={() => {
                  navigate('/sigaf');
                }}
              >
                <Typography variant='h5'>SIGAF</Typography>
                <GavelIcon sx={{ fontSize: '70px' }}></GavelIcon>
              </Box>
            </Grid>
          }

          {appsFiltradas.map((app) => (
            <Grid item xs={12} md={3} lg={2} key={app.url}>
              <Box
                sx={{
                  border: '1px solid #65738c',
                  height: '150px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: '1rem 2rem 0rem',
                  cursor: 'pointer',
                  margin: '1pt',
                  borderRadius: 4
                }}
                onClick={() => {
                  if (app.url.includes('http')) {
                    window.location.href = app.url;
                  } else {
                    navigate(app.url);
                  }
                }}
              >
                <Typography variant='h5'>{app.nombre}</Typography>
                <GavelIcon sx={{ fontSize: '70px' }}></GavelIcon>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Layout>
    </React.Fragment>
  );
}
