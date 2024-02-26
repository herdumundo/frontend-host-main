/* eslint-disable no-unused-vars */

import React, { useEffect, useRef } from 'react';
import LayoutPrincipal from '../componentes/plantillas/LayoutPrincipal';
import { LoginRequerido } from '../funcionalidades/usuario/LoginRequerido';

import { BehaviorSubject } from 'rxjs';
import { importRemote } from '@module-federation/utilities';
import { ErrorBoundary } from 'react-error-boundary';
import { AppContainer } from '../AppContainer';
import PropTypes from 'prop-types';

const GestionPartesAPP = React.lazy(async () => {
  try {
    return await importRemote({
      url: 'http://172.30.8.221:8021',
      scope: 'GestionPartesAPP',
      module: 'App',
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
  // const usuarioStore = useSelector((store) => store.host.usuario);
  // const token = useSelector(
  //   (store) => store.host.usuario?.usuario?.parTokens?.bearerToken,
  // );

  // const usuarioStore = useStore((state) => state.datos?.sesionUsuario);
  // const rolSeleccionado = useStore((state) => state.datos?.rolSeleccionado);
  // const token = usuarioStore.tokenAcceso;
  //
  //
  // const usuario = {
  //   ...usuarioStore,
  //   rolSeleccionado: rolSeleccionado,
  //   usuario: { ...usuarioStore?.usuario, parTokens: undefined },
  // };
  //
  // const obtenerValorStore = (usuario, token) => {
  //   return {
  //     usuario,
  //     token: token,
  //   };
  // };
  const storeSubjectRef = useRef(new BehaviorSubject(null));

  // useEffect(() => {
  //   storeSubjectRef.current.next(obtenerValorStore(usuario, token));
  // }, [token]);

  useEffect(() => {
    console.log('STORE GEX', storeSubjectRef.current);
  }, [storeSubjectRef.current]);

  return (
    <AppContainer appName={props.rutaBase}>
      <LayoutPrincipal>
        <LoginRequerido>
          <ErrorBoundary fallback={<></>}>
            <GestionPartesAPP
              {...props}
              storeSubject={storeSubjectRef.current}
            ></GestionPartesAPP>
          </ErrorBoundary>
        </LoginRequerido>
      </LayoutPrincipal>
    </AppContainer>
  );
}

Component.propTypes = {
  rutaBase: PropTypes.string
};
