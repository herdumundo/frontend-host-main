import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Hoja from '../Hoja';
import { PropTypes } from 'prop-types';

/**
 * return Elemento ContenedorPrincipal
 * @param   {PropTypes.node} children  First Name of the User
 * @param   {string} titulo   Last Name of the User
 * @return  {JSX.Element}     Elemento ContenedorPrincipal
 */
export default function Component({ children, titulo }) {
  return (
    <React.Fragment>
      <Container
        maxWidth={false}
        sx={{
          paddingY: 1,
          paddingX: 0,
          flexGrow: 1,
          zIndex: 120,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'space-between'
        }}
      >
        <Hoja>
          <Box
            style={{
              padding: '0.5rem 0.5rem',
              color: 'rgb(43, 102, 145)',
              fontWeight: 'bold',
              textAlign: 'left',
              marginBottom: '0.5rem',
              margin: '10px 20px',
              boxShadow: '0 5px 2px -2px #2b6691, 0 10px 5px -5px #91c8f000'
            }}
          >
            <Typography
              variant='body1'
              sx={{ fontWeight: 'bold', fontSize: '1.1rem', lineHeight: 1 }}
            >
              {titulo}
            </Typography>
          </Box>

          <Container sx={{ paddingY: 2 }} maxWidth={false}>
            {children}
            <Outlet />
          </Container>
        </Hoja>
      </Container>
    </React.Fragment>
  );
}

Component.propTypes = {
  children: PropTypes.node,
  titulo: PropTypes.string
};
