import { BroadcastChannel, createLeaderElection } from 'broadcast-channel';
import { getState } from 'HostApp/Autenticacion';
import { logout, refrescarSesion } from './API';

import { v4 as uuidv4 } from 'uuid';
import { EstadosSesion } from '../../../funcionalidades/usuario/constantes/EstadosSesion';
import validarLogin from './API/validarLogin';

const channel = new BroadcastChannel('token');
const uuid = uuidv4();

const handler = (msg) => {
  if (msg.uuid.toString() === uuid.toString()) return;

  if (msg.type === '[NUEVO TOKEN]') {
    console.log('NUEVO TOKEN DETECTADO');
    getState().acciones.refrescarTokens(msg.data);
  }
};

channel.addEventListener('message', handler);

const manejarRenovarAutenticacion = () => {
  let state = getState();

  if (state.datos.fechaInicioRefresco === null) {
    state.acciones.setFechaInicioRefresco(Date.now());
  }

  state = getState();

  console.log(state.datos.estadoSesion === EstadosSesion.LOGEADO);

  if (
    state.datos.estadoSesion === EstadosSesion.LOGEADO
    && Date.now() - state.datos.fechaInicioRefresco > 5000
  ) {
    refrescarSesion({
      tokenAcceso: state.datos.sesionUsuario.tokenAcceso,
      tokenRefresco: state.datos.sesionUsuario.tokenRefresco
    })
      .then((data) => {
        getState().acciones.refrescarTokens(data);
        channel.postMessage({ type: '[NUEVO TOKEN]', data, uuid });
      })
      .catch((err) => {
        logout({ tokenAcceso: state.datos.sesionUsuario.tokenAcceso }).finally(() => {
          state.acciones.cerrarSesion({ tokenAcceso: state.datos.sesionUsuario.tokenAcceso });
        }).catch( (e) => {

        });
      });
  }
};

const manejarValidarLogin = () => {
  let state = getState();

  if (
    state.datos.estadoSesion === EstadosSesion.LOGEADO
    && Date.now() - state.datos.fechaInicioRefresco > 1000
  ) {

    validarLogin({
      tokenAcceso: state.datos.sesionUsuario.tokenAcceso
    })
      .then((data) => {
        // getState().acciones.refrescarTokens(data);
        // channel.postMessage({ type: '[NUEVO TOKEN]', data, uuid });
      })
      .catch((err) => {
        logout({ tokenAcceso: state.datos.sesionUsuario.tokenAcceso }).finally(() => {
          state.acciones.cerrarSesion({ tokenAcceso: state.datos.sesionUsuario.tokenAcceso });
        }).catch((err) => {

        })
      });
  }
};

/**
 * Clase para manejar el liderazgo de tabs
 */
class Liderazgo {
  constructor() {
    this.interval = null;
    this.esLider = false;
    this.channel = new BroadcastChannel('leader_election');
    this.leaderElector = createLeaderElection(this.channel, {
      fallbackInterval: 2000, // optional configuration for how often will renegotiation for leader occur
      responseTime: 1000 // optional configuration for how long will instances have to respond
    });
  }

  esperarLiderazgo() {
    const self = this;
    return new Promise((resolve, reject) => {
      const abortHandler = () => {
        reject('Abortado');
      };

      self.abortController?.signal.addEventListener('abort', abortHandler);
      console.log('Esperando liderazgo');

      self.leaderElector
        .awaitLeadership()
        .then((e) => {
          console.log('Liderazgo conseguido');
          this.esLider = true;
          self.abortController?.signal.removeEventListener(
            'abort',
            abortHandler
          );
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  iniciar() {
    this.abortController = new AbortController();


    this.esperarLiderazgo();

    this.iniciarIntervaloRenovacion();
    this.iniciarIntervaloVerificacion();

    const onDestroy = () => {
      this.destruir();
    };

    return () => onDestroy();
  }

  async iniciarIntervaloVerificacion() {
    try {
      this.intervalo = setInterval(() => {
        console.log('intervalo');
        manejarValidarLogin();
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  }

  async iniciarIntervaloRenovacion() {
    try {
      this.abortController = new AbortController();

      this.intervalo = setInterval(() => {
        console.log('intervalo');
        manejarRenovarAutenticacion();
      }, 60000 * 2);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Destruir el listener
   */
  destruir() {
    (async () => {
      try {
        console.log('Destruyendo liderazgo');

        // await this.leaderElector.die();

        if (this.interval != null) {
          clearInterval(this.interval);
        }

        if (!this.abortController?.signal.aborted) {
          this.abortController?.abort();
        }

        this.esLider = false;
      } catch (ex) {
        console.error('Error al destruir el gestor de lider', ex);
      }
    })();
  }
}

const liderazgo = new Liderazgo();

export { liderazgo };

export const iniciarRefreshToken = () => {
  return liderazgo.iniciar();
};
