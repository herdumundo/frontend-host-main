import React from 'react';
import { Button, Stack } from '@mui/material';

import Layout from '../../componentes/plantillas/ContenedorPrincipal';
import { useNavigate } from 'react-router-dom';

/**
 * Componente que de manejo del perfil del usuario
 * @return {JSX.Element} Perfil de usuario
 */
export default function Perfil() {
  const navigate = useNavigate();

  return (
    <Layout titulo={'Perfil de usuario'}>
      <Stack spacing={2}>
        <Button
          variant='contained'
          fullWidth
          onClick={() => {
            navigate('/perfil/modificar-datos-personales');
          }}
        >
          {' '}
          Modificar mis datos personales{' '}
        </Button>
        <Button
          variant='contained'
          fullWidth
          onClick={() => {
            navigate('/perfil/cambiar-contraseña');
          }}
        >
          {' '}
          Cambiar mi contraseña{' '}
        </Button>
      </Stack>
    </Layout>
  );
}
