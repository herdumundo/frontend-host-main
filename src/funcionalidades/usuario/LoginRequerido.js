import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';
import useLogeado from 'app/hooks/useLogeado';

export const LoginRequerido = ({ children }) => {
  const navigate = useNavigate();
  // const location = useLocation();

  const logeado = useLogeado();

  useEffect(() => {
    if (!logeado) {
      console.log('No esta logeado, redirigiendo al login.');
      navigate(`/login`);
    }
  }, [logeado]);

  return <React.Fragment>{children}</React.Fragment>;
};

LoginRequerido.propTypes = {
  children: PropTypes.node
};
