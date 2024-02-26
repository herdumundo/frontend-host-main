import React from 'react';
import { Provider } from 'react-redux';

import Ruteador from './Ruteador';
import { persistor, store, storeContext as hostStoreContext } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from '@mui/material/styles';
import { tema } from './app/contextos/temas';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'index.css';

/**
 * Componente APP
 * @return {JSX.Element}
 */
export default function App() {
  return (
    <div className='app'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <React.Suspense fallback='Loading'>
          <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
              <Provider context={hostStoreContext} store={store}>
                <ThemeProvider theme={tema}>
                  {/*<ManejadorAutenticacion></ManejadorAutenticacion>*/}
                  <Ruteador></Ruteador>
                </ThemeProvider>
              </Provider>
            </Provider>
          </PersistGate>
        </React.Suspense>
      </LocalizationProvider>
    </div>
  );
}
