import React from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';

import Hoja from '../../componentes/Hoja.js';
import LayoutPrincipal from '../../componentes/plantillas/LayoutPrincipal';

/**
 * Componente que maneja el cambio de passwords
 * @return  {JSX.Element}
 */
export default function CambiarPass() {
  return (
    <LayoutPrincipal>
      <Container
        maxWidth={false}
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
          <Box>
            <Typography variant='h4'>Perfil de usuario</Typography>

            <Typography variant='h5'>Cambiar contraseña</Typography>

            <TextField label='Contraseña actual'></TextField>
            <br />

            <TextField label='Nueva contraseña'></TextField>
            <br />

            <TextField label='Repetir contraseña'></TextField>
            <br />

            <TextField label='asd'></TextField>
            <br />

            <TextField label='asd'></TextField>
            <br />

            <TextField label='asd'></TextField>
          </Box>
        </Hoja>
      </Container>
    </LayoutPrincipal>
  );
}
