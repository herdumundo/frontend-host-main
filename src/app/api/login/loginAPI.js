import { api } from '../api';

export const loginAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ usuario, clave }) => {
        return {
          url: `/login`,
          method: 'POST',
          body: { usuario, clave }
        };
      }
    }),

    logout: builder.mutation({
      query: () => {
        return {
          url: `/logout`,
          method: 'POST'
        };
      }
    }),

    validarLogin: builder.query({
      query: () => {
        return {
          url: `/validar_login`,
          method: 'POST'
        };
      }
    }),

    renovarAutenticacion: builder.mutation({
      query: ({ refreshToken }) => {
        return {
          url: `/renovar_autenticacion`,
          method: 'POST',
          body: { refreshToken }
        };
      }
    })
  }),
  overrideExisting: false
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useValidarLoginQuery,
  useRenovarAutenticacionMutation
} = loginAPI;
