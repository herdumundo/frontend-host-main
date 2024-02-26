import { rutaBaseAutenticacion } from './config';

/**
 * Función para refrescar la sesión
 * @param {string} tokenAcceso
 * @param {string} tokenRefresco
 * @return {Promise<unknown>}
 */
function refrescarSesion({ tokenAcceso, tokenRefresco }) {
  return new Promise((resolve, reject) => {
    (async () => {
      const rawResponse = await fetch(
        rutaBaseAutenticacion + '/renovar_autenticacion',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: 'bearer ' + tokenAcceso
          },
          body: JSON.stringify({ refreshToken: tokenRefresco })
        }
      );
      if (rawResponse.status === 200) {
        const content = await rawResponse.json();
        resolve(content);
      } else {
        reject(rawResponse);
      }
    })();
  });
}

export default refrescarSesion;
