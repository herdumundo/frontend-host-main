/**
 * Target
 */
class Target extends EventTarget {
  /**
   * Constructor
   */
  constructor() {
    super();
    this.name = Math.random();
    console.log('construyendo emitter');
  }

  /**
   * Suscribirse a los eventos de navegacion
   * de host.
   * @param {EventListener | EventListenerObject} cb
   * @return {function} unsubscribe function
   */
  suscribirseNavegacionHost(cb) {
    console.log(this.name + ': Registrando listener host');

    this.addEventListener('[HOST] navegacion', cb, false);
    return () => {
      console.log('Removiendo listener');
      this.removeEventListener('[HOST] navegacion', cb);
    };
  }

  /**
   * Suscribirse los eventos de navegacion
   * del remoto.
   * @param { EventListener | EventListenerObject} cb asd
   * @return {function} unsubscribe function
   */
  suscribirseNavegacionRemoto(cb) {
    this.addEventListener('[REMOTO] navegacion', cb);
    return () => this.removeEventListener('[REMOTO] navegacion', cb);
  }

  /**
   * Notificar de la navegación a través de
   * un evento
   * @param {string} ruta
   * @return {void}
   */
  notificarNavegacionRemoto(ruta) {
    this.dispatchEvent(
      new CustomEvent('[REMOTO] navegacion', {
        ruta
      })
    );
  }

  /**
   * Enviar evento para notificar el host.
   * @param {string} ruta
   * @return {void}
   */
  notificarNavegacionHost(ruta) {
    console.log(this.name + ': notificando navegacion host', ruta);
    this.dispatchEvent(
      new CustomEvent('[HOST] navegacion', {
        ruta
      })
    );
  }
}

const target = new Target();

const getTarget = () => target;

export { getTarget };
export default target;
