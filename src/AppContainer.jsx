import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { setAplicacion } from './funcionalidades/usuario/usuarioSlice';

export const AppContainer = ({ appName, children }) => {
  const dispatch = useDispatch();
  const aplicacion = useSelector((state) => state.host.usuario.aplicacion);
  const location = useLocation();

  useEffect(() => {
    if (appName !== aplicacion) {
      dispatch(setAplicacion(appName));
    }
  }, [appName, location, dispatch]); // Now the effect re-runs whenever the location changes

  return children;
};
