/* eslint-disable no-unused-vars */

import React, { useEffect, useRef } from 'react';
import LayoutPrincipal from '../componentes/plantillas/LayoutPrincipal';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { LoginRequerido } from '../funcionalidades/usuario/LoginRequerido';

import { BehaviorSubject } from 'rxjs';
import { importRemote } from '@module-federation/utilities';
import { ErrorBoundary } from 'react-error-boundary';
import { AppContainer } from '../AppContainer';

const App = React.lazy(async () => {
  try {
    return await importRemote({
      url: 'http://172.30.8.221:8022',
      scope: 'EjemploAPP',
      module: 'ModuloEjemplo',
      remoteEntryFileName: 'js/remote-entry.js'
    });
  } catch (ex) {
    return {
      default: () => <div>Aplicación no disponible, recargue la página</div>
    };
  }
});

/**
 * Función que retorna el componente cargado de Gestión de partes
 * o un error en caso de que no se haya podido cargar
 * @param {Object} props Los props del componente
 * @return {JSX.Element}
 */
export default function Component(props) {
  const usuarioStore = useSelector((store) => store.host.usuario);
  const token = useSelector(
    (store) => store.host.usuario?.usuario?.parTokens?.bearerToken
  );

  const usuario = {
    ...usuarioStore,
    usuario: { ...usuarioStore?.usuario, parTokens: undefined }
  };

  const obtenerValorStore = (usuario, token) => {
    console.log(JSON.stringify(usuario));
    return {
      usuario,
      token: token
    };
  };
  const storeSubjectRef = useRef(new BehaviorSubject(obtenerValorStore()));

  useEffect(() => {
    storeSubjectRef.current.next(obtenerValorStore(usuario, token));
  }, [token]);

  useEffect(() => {
    console.log(storeSubjectRef.current);
  }, [storeSubjectRef.current]);

  return (
    <AppContainer appName={props.rutaBase}>
      <LayoutPrincipal>
        <LoginRequerido>
          <ErrorBoundary>
            <App {...props} storeSubject={storeSubjectRef.current}></App>
          </ErrorBoundary>
        </LoginRequerido>
      </LayoutPrincipal>
    </AppContainer>
  );
}

Component.propTypes = {
  rutaBase: PropTypes.string
};
