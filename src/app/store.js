import React from 'react';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { configureStore } from '@reduxjs/toolkit';

import usuarioReducer from '../funcionalidades/usuario/usuarioSlice';
import { api } from './api/api';

import { persistReducer, persistStore } from 'redux-persist';

import storageSession from 'redux-persist/lib/storage/session';

import { combineReducers } from 'redux';
import { createDispatchHook, createSelectorHook } from 'react-redux';

import { RESET_STORE } from './actions/actions';

import { createStateSyncMiddleware, initStateWithPrevTab, withReduxStateSync } from 'redux-state-sync';

const persistConfig = {
  key: 'root',
  storage: storageSession
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    usuario: usuarioReducer
  })
);

const staticReducers = {
  host: rootReducer,
  api: api.reducer
};

const createRootReducer = (reducer) => {
  return (state, action) => {
    if (action.type == RESET_STORE) {
      state = undefined;
    }
    return reducer(state, action);
  };
};

const persistedReducer = withReduxStateSync(
  createRootReducer(combineReducers(staticReducers))
);

export const store = ((store) => {
  store.asyncReducers = {};

  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;

    const persistedReducer = combineReducers({
      ...staticReducers,
      ...store.asyncReducers
    });

    store.replaceReducer(
      withReduxStateSync(createRootReducer(persistedReducer))
    );
  };

  return store;
})(
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return (
        getDefaultMiddleware({
          serializableCheck: false
        })
          .concat(api.middleware)
          // .concat(gpApi.middleware)
          .concat(
            createStateSyncMiddleware({
              broadcastChannelOption: { webWorkerSupport: false },
              predicate: (action) => {
                if (action.type.includes('persist/')) return false;
                const nuevaAccion = JSON.parse(JSON.stringify(action));

                for (const key of Object.keys(action)) {
                  delete action[key];
                }

                Object.assign(action, nuevaAccion);

                try {
                  structuredClone(action);
                  // console.log( "OK", action );
                } catch (ex) {
                  // console.error(ex, action);
                }

                // if(action.type.includes('__rtkq/')) return false;
                if (action.type.includes('/fulfilled')) return true;
                if (action.type.includes('/rejected')) return true;
                if (action.type.includes('api/')) return false;
                return true;
              },

              blacklist: ['persist/PERSIST', 'persist/REHYDRATE']
            })
          )
      );
    }
  })
);

export const storeContext = React.createContext();
export const useHostStoreDispatch = createDispatchHook(storeContext);
export const useHostStoreSelector = createSelectorHook(storeContext);

// initMessageListener(store);
initStateWithPrevTab(store);

export const persistor = persistStore(store);
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
