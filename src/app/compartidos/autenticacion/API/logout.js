import { rutaBaseAutenticacion } from './config';

/**
 * Funcion para delogear usuario
 * @param {string} tokenAcceso
 * @return {Promise<unknown>}
 */
export default function logout({ tokenAcceso }) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const rawResponse = await fetch(
          rutaBaseAutenticacion + '/logout',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              authorization: 'Bearer ' + tokenAcceso
            }
          }
        );
        let content = null;
        if (rawResponse.status === 200) {
          content = rawResponse.json();
          resolve(content);
        }

        reject('Ocurrió un error con al cerrar sesión.');
      } catch (ex) {
        reject('Ocurrió un error con al cerrar sesión.');

      }

    })();
  });
}
