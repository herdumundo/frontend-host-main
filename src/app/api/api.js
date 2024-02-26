import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: location.protocol + '//172.30.8.221/autenticador_mm/',
    prepareHeaders: (headers, { getState }) => {
      const datosLogin = getState().host.usuario;
      // console.log(datosLogin)
      const token = datosLogin.usuario?.parTokens?.bearerToken;

      if (
        (token && datosLogin?.rolSeleccionado?.rolId) ||
        datosLogin?.rolSeleccionado?.rolId == 0
      ) {
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      }
    }
  }),

  endpoints: () => ({})
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
