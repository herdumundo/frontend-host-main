import { createSlice, isAnyOf } from '@reduxjs/toolkit';
// import {api} from '../../app/api/api';
import { loginAPI } from '../../app/api/login/loginAPI';
import { EstadosSesion } from './constantes/EstadosSesion';

const obtenerEstadoInicial = () => ({
  roles: null,
  paginaSiguiente: null,
  rolSeleccionado: null,
  aplicacion: null,
  verificandoToken: false,
  refrescandoToken: false,
  urlRedireccion: '/',
  estadoSesion: EstadosSesion.NO_LOGEADO,
  fechaInicioRefresco: new Date().getTime(),
  usuario: {}
});

const usuarioSlice = createSlice({
  name: 'usuario',
  initialState: obtenerEstadoInicial(),

  reducers: {
    setAplicacion(state, action) {
      state.aplicacion = action.payload;
    },

    setUrlRedireccion(state, action) {
      state.urlRedireccion = action.payload;
    },

    seleccionarRol(state, action) {
      state.rolSeleccionado = action.payload;
      state.cambiandoRol = false;
      state.paginaSiguiente = null;
      state.aplicacion = null;
      state.estadoSesion = EstadosSesion.LOGEADO;
    },

    cerrarSesion(state) {
      state = obtenerEstadoInicial();
      state.estadoSesion = EstadosSesion.SESION_CERRADA;
    },

    cambiarRol(state, action) {
      const { paginaSiguiente } = action.payload;

      state.paginaSiguiente = paginaSiguiente;
      state.rolSeleccionado = null;
      state.estadoSesion = EstadosSesion.SELECCIONANDO_ROL;
      state.fechaInicioRefresco = new Date().getTime();
    }
  },

  extraReducers(builder) {
    builder.addMatcher(
      loginAPI.endpoints.renovarAutenticacion.initiate,
      (state, action) => {
        if (new Date().getTime() - state.fechaInicioRefresco > 5000) {
          state.refrescandoToken = false;
        }
      }
    );

    builder.addMatcher(
      loginAPI.endpoints.renovarAutenticacion.matchPending,
      (state, action) => {
        state.refrescandoToken = true;
        state.fechaInicioRefresco = new Date().getTime();
      }
    );

    builder.addMatcher(
      loginAPI.endpoints.renovarAutenticacion.matchFulfilled,
      (state, action) => {
        state.refrescandoToken = false;
        state.usuario.parTokens = action.payload.parTokens;
      }
    );

    builder.addMatcher(
      loginAPI.endpoints.login.matchPending,
      (state, action) => {
        state.verificandoToken = true;
      }
    );

    builder.addMatcher(
      loginAPI.endpoints.login.matchFulfilled,
      (state, action) => {
        state.usuario = action.payload;

        let roles = [];
        for (const aplicacion of state.usuario.datosUsuario.aplicaciones) {
          for (const rol of aplicacion.roles) {
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

        state.roles = roles;
        state.verificandoToken = false;
        state.aplication = null;

        state.estadoSesion = EstadosSesion.SELECCIONANDO_ROL;
      }
    );

    const cerrarSesionEvento = isAnyOf(
      loginAPI.endpoints.logout.matchFulfilled,
      loginAPI.endpoints.logout.matchRejected,
      loginAPI.endpoints.validarLogin.matchRejected
    );

    builder.addMatcher(cerrarSesionEvento, (state, action) => {
      state = obtenerEstadoInicial();

      state.estadoSesion = EstadosSesion.SESION_CERRADA;
    });

    builder.addMatcher(
      loginAPI.endpoints.validarLogin.matchFulfilled,
      (state, action) => {
        const respuesta = action.payload;

        if (!respuesta.login_valido) {
          state.rolSeleccionado = null;
          state.usuario = null;
          state.roles = null;
          state.estadoSesion = EstadosSesion.EXPIRADA;
        }
      }
    );
  }
});

// export const { increment, decrement, incrementByAmount }
// = counterSlice.actions

export const {
  seleccionarRol,
  cambiarRol,
  cerrarSesion,
  setAplicacion,
  setUrlRedireccion
} = usuarioSlice.actions;

export default usuarioSlice.reducer;
