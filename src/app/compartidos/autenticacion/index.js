import { getState } from './autenticacionStore';
import obtenerPermisosUsuario from './API/obtenerPermisosUsuario';
import logout from './API/logout';

export { default, useStore, getState } from './autenticacionStore';

export function ObtenerToken() {
  return getState().datos.sesionUsuario.tokenAcceso;
}

// export function ObtenerPermisos(appId, rolId) {
//
//   return {
//       permisosPorUsuarioCircunscripcion: [
//         {
//           "codCircunscripcion": 2,
//           "descripcion": "cde",
//           "permisos": [
//             "consultarPagares",
//             "eliminarPagaresVencidos"
//           ]
//         }
//       ]
//       ,
//       permisosPorRol: [
//         "consultarPagares",
//         "firmarDocumentoPagare",
//         "consultarTablaX"
//       ],
//   };
// }

/**
 * Devuelve todas las aplicaciones que posee el usuario de acuerdo a sus roles
 * y las aplicaciones que posee dados los permisos especiales.
 * @param {[]} appIds
 * @return {[{descripcion: string, appId: number, roles: [{rolid: number, descripcion: string, circunscripciones: [{descripcion: string, circunscripcionId: number}]}], especiales: [{descripcion: string, circunscripcionId: number}]},{descripcion: string, appId: number, especiales: [{descripcion: string, circunscripcionId: number}]}]}
 * @constructor
 */
export async function ObtenerDatosAplicaciones(appIds) {
  try {
    var resultadoAplicaciones =
      await obtenerPermisosUsuario({tokenAcceso: getState().datos.sesionUsuario.tokenAcceso}).catch((e) => {

      });

    const aplicaciones = ( resultadoAplicaciones ).aplicaciones;
    return aplicaciones.filter( (app) => appIds.includes(app.appId) );

  } catch (ex) {
    getState().acciones.cerrarSesion();
  }
}


/**
 *
 * @return {{timestampIngresoUtc, timestampRefrescoUtc, codigoUsuario, sesionId, aplicacion: *, nombreUsuario, numeroDocumento, timestampExpiracionUtc, atributos}}
 * @constructor
 */
export function ObtenerDatosUsuario() {
  let usuario = getState().datos.sesionUsuario;

  return {
    nombreUsuario: usuario.datosUsuario.nombreUsuario,
    numeroDocumento: usuario.datosUsuario.numeroDocumento,
    // aplicacion: usuario.datosUsuario.aplicaciones,
    // --
    timestampIngresoUtc: usuario.datosUsuario.timestampIngresoUtc,
    timestampRefrescoUtc: usuario.datosUsuario.timestampRefrescoUtc,
    timestampExpiracionUtc: usuario.datosUsuario.timestampExpiracionUtc,
    // --
    codigoUsuario: usuario.datosUsuario.codigoUsuario,
    sesionId: usuario.datosUsuario.sesionId,
    atributos: usuario.datosUsuario.atributos
  };
}

// /**
//  * Obtener estado actual de la autenticación.
//  * @return {{datos: object}}
//  */
// function getStateLocal() {
//   const state = getState();
//   return {
//     datos: state.datos,
//   };
// }
// export { getStateLocal as getState };
