// eslint-disable-next-line require-jsdoc,no-unused-vars
import { rutaBaseAutenticacion } from './config';
/**
 * Función para logear al usuario
 * @param {string} usuario
 * @param {string} clave
 * @return {Promise<unknown>}
 * @constructor
 */
export default function Login({ usuario, clave }) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const rawResponse = await fetch(
          rutaBaseAutenticacion + '/login',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, clave })
          }
        );

        let content = null;
        if (rawResponse.status === 200) {
          content = rawResponse.json();
          resolve(content);
        }
        reject('Ocurrió un error con al logear.');
      } catch(ex) {
        reject('Ocurrió un error con al logear.');
      }
    })();
  });
}
