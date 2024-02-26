import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Main from './paginas/Main';
import Perfil from './paginas/usuario/Perfil';
import DatosPersonales from './paginas/usuario/DatosPersonales';
import NotificacionesSistema from './paginas/usuario/NotificacionesSistema';

import Login from './paginas/Login';
import { LoginRequerido } from './funcionalidades/usuario/LoginRequerido';
import LayoutPrincipal from './componentes/plantillas/LayoutPrincipal';
import { persistor } from './app/store';

import SigafApp from './aplicaciones/AppShellSigaf';
import AppGestionPartes from './aplicaciones/AppGestionPartes';
import { AppContainer } from './AppContainer';
import AppEjemplo from './aplicaciones/AppEjemplo';

import target from 'HostApp/Navegacion';
import { iniciarRefreshToken } from './app/compartidos/autenticacion/administradorTokens';

/**
 * Manager de ruteo entre remotos y el host
 * mantiene sincronizadas las rutas del host y remoto
 * informando de cambios.
 * @return {JSX.Element}
 * @constructor
 */
function useRouterManager() {
  const location = useLocation();
  useEffect(() => {
    target.suscribirseNavegacionRemoto((e)  =>  {console.log(e); })
  }, [])

  useEffect(() => {
    target.notificarNavegacionHost(location.pathname);
  }, [location]);
}

function useTokenRefresher() {
  useEffect(() => {
    const desuscribir = iniciarRefreshToken();
    return () => desuscribir();
  }, []);
}

function Manager() {
  useRouterManager();
  useTokenRefresher();

  return <></>;
}

/**
 * Ruteador de la aplicación
 * @return {JSX.Element}
 */
export default function Ruteador() {
  return (
    <BrowserRouter>
      <Manager></Manager>
      <Routes>
        <Route>
          <Route path='/'>
            <Route
              element={
                <AppContainer appName={null}>
                  <LayoutPrincipal></LayoutPrincipal>
                </AppContainer>
              }
            >
              <Route
                index
                element={
                  <LoginRequerido>
                    <Main />
                  </LoginRequerido>
                }
              />

              <Route path='/perfil'>
                <Route
                  index
                  element={
                    <LoginRequerido>
                      <Perfil />
                    </LoginRequerido>
                  }
                />
                <Route
                  path='modificar-datos-personales'
                  element={
                    <LoginRequerido>
                      <DatosPersonales />
                    </LoginRequerido>
                  }
                />
              </Route>

              <Route
                path='/notificaciones-sistema'
                element={
                  <LoginRequerido>
                    <NotificacionesSistema />
                  </LoginRequerido>
                }
              />
            </Route>

            <Route
              path='/gex/*'
              element={
                <AppGestionPartes
                  rutaBase={'/gex'}
                  persistor={persistor}
                ></AppGestionPartes>
              }
            />
            <Route
              path='/sigaf/*'
              element={
                <SigafApp
                  rutaBase={'/sigaf'}
                  persistor={persistor}
                ></SigafApp>
              }
            />
            <Route
              path='/ejemploApp/*'
              element={
                <AppEjemplo
                  rutaBase={'/ejemploApp'}
                  persistor={persistor}
                ></AppEjemplo>
              }
            />
          </Route>

          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
