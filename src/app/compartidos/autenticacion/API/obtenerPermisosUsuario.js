import { rutaBaseAutenticacion } from './config';

/**
 * Funcion para delogear usuario
 * @param {string} tokenAcceso
 * @return {Promise<unknown>}
 */
export default function obtenerPermisosUsuario({ tokenAcceso }) {
  return new Promise((resolve, reject) => {

        (async () => {
          try{

            const rawResponse = await fetch(
              rutaBaseAutenticacion + '/obtenerPermisosUsuario',
              {
                method: 'GET',
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

            reject('Ocurrió un error al obtener los permisos del usuario');
          } catch(e) {
            reject('Ocurrió un error al obtener los permisos del usuario');
          }
    })();


  });
}
