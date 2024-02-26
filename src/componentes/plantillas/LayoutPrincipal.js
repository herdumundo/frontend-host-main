import { Box, Grid, IconButton, Stack } from '@mui/material';

import React from 'react';
import { MenuUsuario } from '../../funcionalidades/usuario/MenuUsuario';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import lodash from 'lodash';

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AppsIcon from '@mui/icons-material/Apps';
import HomeIcon from '@mui/icons-material/Home';
import CssBaseline from '@mui/material/CssBaseline';
import { PropTypes } from 'prop-types';
import useLogeado from 'app/hooks/useLogeado';

import IMG_LOGO_PJ from 'static/logo-pj.png';
import IMG_FONDO_PJ from 'static/fondo.jpg';

/**
 * return Elemento de contenedor principal
 * @param   {PropTypes.node} children  First Name of the User
 * @return  {JSX.Element} Elemento de LayoutPrincipal
 */
export default function LayoutPrincipal({ children }) {
  const aplicacion = useSelector(
    (state) => state.host.usuario.aplicacion,
    lodash.shallowEqual
  );

  const logeado = useLogeado();
  const tema = useTheme();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          background: `
            linear-gradient(rgb(240 240 240 / 75%) 250px, rgb(238 238 238 / 30%)) center center / cover no-repeat, url(${IMG_FONDO_PJ})
          `,

          filter: 'blur(8px) saturate(1) contrast(0.8) brightness(1.15)',
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      ></Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box
          sx={{
            [tema.breakpoints.down('md')]: {
              mx: '0px'
            },
            [tema.breakpoints.up('sm')]: {
              mx: 3
            },

            zIndex: 120,
            pt: 2,
            pb: 0,

            [tema.breakpoints.down('md')]: {
              flexWrap: 'wrap'
            },

            position: 'relative',
            display: 'flex',
            alignItems: 'top',
            justifyContent: 'space-between'
          }}
        >
          <Box>
            <Box
              component='img'
              sx={{
                height: 'auto',
                [tema.breakpoints.down('md')]: {
                  maxWidth: 'calc(min(40vw, 250px))'
                },
                [tema.breakpoints.up('md')]: {
                  maxWidth: '250px'
                },
                filter: 'drop-shadow(0px 0px 5px white)'
              }}
              src={IMG_LOGO_PJ}
            ></Box>
          </Box>

          <Box
            sx={{
              [tema.breakpoints.down('md')]: {
                width: '100%'
              }
            }}
          >
            {logeado && (
              <Grid
                container
                sx={{
                  borderRadius: '16px',
                  boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.5)',
                  backdropFilter:
                    'blur(16px) contrast(1.05) brightness(1.1) saturate(1.5)',
                  boxShadow:
                    '#919eab4d 0 0 2px,#919eab1f 0 12px 5px -4px !important',
                  [tema.breakpoints.up('md')]: {
                    paddingY: 0,
                    paddingX: 0
                  },
                  px: 1
                }}
              >
                <Grid item>
                  <Box
                    component='img'
                    sx={{
                      [tema.breakpoints.down('sm')]: {
                        display: 'none'
                      },
                      [tema.breakpoints.down('md')]: {
                        width: '100px'
                      },
                      [tema.breakpoints.up('md')]: {
                        width: '150px'
                      },
                      display: 'block',
                      p: 0.5
                    }}
                    src='/static/logo-csj-compromiso.png'
                  ></Box>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      textAlign: 'left',
                      color: 'rgb(55 111 148)',
                      alignItems: 'center'
                    }}
                  >
                    <Box>
                      <Stack
                        direction='row'
                        spacing={1}
                        alignItems={'center'}
                        sx={{
                          // background: '#ffffff36',
                          pl: 2,
                          pr: 2,
                          py: 0,
                          borderRight: '1px solid #918e8e1c'
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            navigate('/');
                          }}
                          sx={{
                            cursor: 'pointer',
                            color: 'rgb(125 179 181)'
                          }}
                        >
                          {' '}
                          <AppsIcon />{' '}
                        </IconButton>
                        {aplicacion && (
                          <Link
                            to={aplicacion + '/'}
                            style={{
                              cursor: 'pointer',
                              color: 'rgb(125 179 181)'
                            }}
                          >
                            {' '}
                            <HomeIcon />{' '}
                          </Link>
                        )}
                        <IconButton
                          onClick={() => {
                            navigate('/notificaciones-sistema');
                          }}
                          sx={{ color: 'rgb(125 179 181)' }}
                        >
                          {' '}
                          <NotificationsActiveIcon />{' '}
                        </IconButton>
                      </Stack>
                    </Box>

                    <Stack direction='row' spacing={1} alignItems={'center'}>
                      <Box>&nbsp;</Box>
                      <MenuUsuario></MenuUsuario>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
        <Box sx={{ width: '100%', minHeight: 'calc(100vh - 204px - 139.5px)' }}>
          {children}
          <Outlet></Outlet>
        </Box>
      </Box>
    </React.Fragment>
  );
}

LayoutPrincipal.propTypes = {
  children: PropTypes.node
};
