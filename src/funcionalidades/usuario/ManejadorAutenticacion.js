import React, { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
// import RemoteRootApp from 'remote/RemoteRootApp';
import { useLeaderElection } from 'app/hooks/useLeaderElection';
import { useIdleTimer } from 'react-idle-timer';
import constantes from 'app/Constantes';
import { useRenovarAutenticacionMutation, useValidarLoginQuery } from 'app/api/login/loginAPI';
import useLogeado from 'app/hooks/useLogeado';

/**
 * Componente que maneja el refresco automático y el liderazgo de las
 * pestañas, debe ser instanciada una sola vez.
 * @return {JSX.Element}
 */
export default function ManejadorAutenticacion() {
  const datosLogin = useSelector((state) => state.host.usuario);
  const logeado = useLogeado();

  const [renovarAutenticacion] = useRenovarAutenticacionMutation();
  const esLider = useLeaderElection();

  const onAction = (evt, idleTimer) => {
    idleTimer.reset();
  };

  const { getIdleTime, getElapsedTime, reset } = useIdleTimer({
    onAction: onAction,
    timeout: 10000,
    startOnMount: true,
    crossTab: true,
    leaderElection: true,
    syncTimers: 2000
  });

  // Creamos una referencia porque al crear el intervalo la funcion
  // en el mismo no actualiza las variables
  const datosAuthRef = useRef({ datosLogin, esLider });

  useValidarLoginQuery(null, {
    pollingInterval: 5000,
    skip: !esLider || !logeado
  });

  const manejarRenovarAutenticacion = () => {
    const datosLoginActual = datosAuthRef.current.datosLogin;
    const esLider = datosAuthRef.current.esLider;
    const logeado = datosAuthRef.current.logeado;

    if (
      datosLoginActual != null &&
      esLider &&
      logeado &&
      getElapsedTime() > 5000 &&
      getIdleTime() < constantes.tiempoInactivoToleradoRefresco &&
      Date.now() - datosLoginActual?.fechaInicioRefresco > 5000
    ) {
      console.log('Inactivo por', getIdleTime());
      renovarAutenticacion({
        refreshToken: datosLoginActual.usuario?.parTokens?.refreshToken
      });
    }
  };

  let renovarAutenticacionCiclo;

  useEffect(() => {
    renovarAutenticacionCiclo = setInterval(manejarRenovarAutenticacion, 10000); // validar login cada 60 segundos
    return () => {
      console.log('Limpiando intervalo renovacion');
      clearInterval(renovarAutenticacionCiclo);
    };
  }, []);

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    datosAuthRef.current = {
      datosLogin,
      esLider,
      logeado: logeado
    };
    datosAuthRef.current.logeado = logeado;
  }, [datosLogin, esLider, logeado]);

  return <></>;
}
