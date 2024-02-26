import { useStore as useStoreZustand, create } from 'zustand';
import { createStore } from 'zustand/vanilla';

import { immer } from 'zustand/middleware/immer';
import { EstadosSesion } from 'funcionalidades/usuario/constantes/EstadosSesion';
import { persist } from 'zustand/middleware';
import logout from './API/logout';

const store = createStore(
  persist(
    immer((set, get) => ({
      datos: {
        sesionUsuario: null,
        fechaInicioRefresco: null,
        esLider: false,
        estadoSesion: EstadosSesion.NO_LOGEADO,
        rolesDisponibles: [],
        rolSeleccionado: null
      },
      acciones: {

        cerrarSesion: async () => {
          try {
            await logout({tokenAcceso: get().datos.sesionUsuario.tokenAcceso});
          } catch(ex) {
            console.error("Error al invocar recurso de cerrar sesion");
          }
          set((state) => {
            state.datos = {
              sesionUsuario: null,
              fechaInicioRefresco: null,
              esLider: false,
              estadoSesion: EstadosSesion.NO_LOGEADO,
              rolesDisponibles: [],
              rolSeleccionado: null
            };
          })
        },

        cambiarRol: () =>
          set((state) => {
            state.datos.estadoSesion = EstadosSesion.SELECCIONANDO_ROL;
            state.datos.rolSeleccionado = null;
          }),

        seleccionarRol: (rol) =>
          set((state) => {
            state.datos.rolSeleccionado = rol;
            state.datos.estadoSesion = EstadosSesion.LOGEADO;
          }),

        setLogin: (respuestaLogeo) =>
          set((state) => {
            let roles = [];
            for (const rolApp of respuestaLogeo.datosUsuario.aplicaciones) {
              for (const rol of rolApp.roles) {
                roles.push(rol);
              }
            }

            roles = roles.filter((element, index) => {
              return (
                roles.findIndex((el) => {
                  return el.rolId === element.rolId;
                }) === index
              );
            });

            state.datos.sesionUsuario = {
              tokenAcceso: respuestaLogeo.parTokens.bearerToken,
              tokenRefresco: respuestaLogeo.parTokens.refreshToken,
              datosUsuario: respuestaLogeo.datosUsuario
            };
            state.datos.rolesDisponibles = roles;
            state.datos.estadoSesion = EstadosSesion.LOGEADO;
          }),

        setEsLider: (esLider) =>
          set((state) => {
            state.datos.esLider = esLider;
          }),

        setFechaInicioRefresco: (date) =>
          set((state) => {
            state.datos.fechaInicioRefresco = date;
          }),
        refrescarTokens: (data) =>
          set((state) => {
            state.datos.sesionUsuario = {
              tokenAcceso: data.parTokens.bearerToken,
              tokenRefresco: data.parTokens.refreshToken,
              datosUsuario: data.datosUsuario
            };
          })
      }
    })),

    {
      name: 'sesion-usuario', // name of the item in the storage (must be unique)
      partialize: (state) => ({
        datos: state.datos
      })
    }
  )
);
//
// const channel = new BroadcastChannel('token');
//
// const handler = (msg) => {
//   console.log(msg);
//   if (msg.uuid.toString() === uuid.toString()) return;
//
//   if (msg.type === '[NUEVO TOKEN]') {
//     console.log('NUEVO TOKEN DETECTADO');
//     store.persist.rehydrate();
//   }
// };
//
// channel.addEventListener('message', handler);
//
// channel.onMessage = (ev) => {
//   console.log("EVENTO RECIBIDO", ev);
//   if (ev.data.type == '[NUEVO TOKEN]') {
//     console.log('NUEVO TOKEN DETECTADO');
//     store.persist.rehydrate();
//   }
// };

store.subscribe((state, prevState) => {
  if (
    state.datos?.sesionUsuario?.tokenAcceso !== prevState.datos?.sesionUsuario?.tokenAcceso &&
    state.datos?.esLider
  ) {
    channel.postMessage({ type: '[NUEVO TOKEN]', uuid: uuid });
  }
});

export const { getState, setState, subscribe } = store;
export const useStore = (selector) => useStoreZustand(store, selector);
export default store;
