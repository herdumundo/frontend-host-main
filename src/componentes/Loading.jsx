import React from 'react';
import { CircularProgress, Grid } from '@mui/material';
import IMG_FONDO_PJ from '../static/fondo.jpg';
import { Box } from '@mui/system';

/**
 * Componente de carga
 * @return {React.ReactElement}
 */
function Loading() {
  return (
    <>
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
      <Grid
        container
        direction='column'
        display='flex'
        alignContent='center'
        alignItems='center'
        justifyContent='center'
        sx={{
          height: '80vh',
          zIndex: 123213213
        }}
      >
        <Grid
          item
          alignContent='center'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <span style={{ display: 'table', marginBottom: '0' }}>
            <CircularProgress></CircularProgress>&nbsp;&nbsp;
            <span style={{ verticalAlign: 'middle', color: 'black', display: 'table-cell', zIndex: 123213213 }}>
              {' '}
              Cargando...{' '}
            </span>
          </span>
        </Grid>
      </Grid>
    </>
  );
}

export default Loading;
