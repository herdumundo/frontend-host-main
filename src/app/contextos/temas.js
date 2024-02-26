import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { esES } from '@mui/material/locale';

// #2B6691
// #912B33

const palette = {
  primary: {
    // main:'rgb(43, 102, 145)',
    contrastText: '#e5f1f6',
    main: '#376f94'
  },

  acento: {
    main: '#87c9cb',
    // main: '#87CBCC',
    contrastText: '#1C394D'
  },

  secondary: {
    main: '#395C75'
  },
  success: {
    main: '#44D45E'
  },
  info: {
    main: '#DEB12C'
  },
  warning: {
    main: '#dfe39e'
  },

  // text: {
  //   ...
  // },
  // error: {
  //   ...
  // }
  colores: {
    blanco: '#e6e9ec'
  },

  third: {
    main: '#FFA6B9'
  },

  fourthd: {
    main: '#E6A585'
  },

  resaltado: {
    rojo: {
      main: '#ffabbd',
      texto: '#a15263'
    },

    naranja: {
      main: '#ffceb6',
      texto: '#975230'
    },

    turquesa: {
      main: '#abe1d2',
      texto: '#588d7e'
    },

    amarillo: {
      main: '#FAE9AC',
      texto: '#998746'
    },
    verde: {
      main: '#C7F0A3',
      texto: '#6c8d4f'
    }
  },

  text: {
    primary: '#11293a'
  },

  complementary: {
    comp: {
      900: '#73682e',
      800: '#918c37',
      700: '#a4a23d',
      600: '#b5b744',
      500: '#c2c849',
      400: '#cad061',
      300: '#d3d87a',
      200: '#dfe39e',
      100: '#ecedc3',
      50: '#f7f8e7'
    },

    an: {
      900: '#0d3445',
      800: '#20495d',
      700: '#2e5c73',
      600: '#3d708a',
      500: '#4a7f9b',
      400: '#6492ac',
      300: '#7da6bf',
      200: '#9ec1d6',
      100: '#bcdbec',
      50: '#dcf1ff'
    },

    rawSienna: {
      900: '#cc8b4e',
      800: '#d9ab5e',
      700: '#dfc068',
      600: '#e6d572',
      500: '#e8e477',
      400: '#ebe986',
      300: '#efed99',
      200: '#f2f2b3',
      100: '#f7f7d0',
      50: '#fbfcec'
    },
    deepLavender: {
      900: '#43178f',
      800: '#54249d',
      700: '#5f2aa4',
      600: '#6c32ad',
      500: '#7438b3',
      400: '#8956bf',
      300: '#9e75cb',
      200: '#b99dda',
      100: '#d4c4e8',
      50: '#eee7f6'
    },
    dullYellow: {
      900: '#da731f',
      800: '#e1992f',
      700: '#e5b036',
      600: '#e8c63d',
      500: '#ebd842',
      400: '#eedd5b',
      300: '#f0e276',
      200: '#f4ea9b',
      100: '#f9f3c3',
      50: '#fcfae6'
    },
    pumpkinOrange: {
      900: '#fd6c11',
      800: '#fe8c11',
      700: '#fe9d11',
      600: '#ffb011',
      500: '#ffbe15',
      400: '#ffc72d',
      300: '#ffd251',
      200: '#ffde83',
      100: '#ffebb3',
      50: '#fff7e1'
    },
    warmPurple: '#84329B'
  }
};

let theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          fontFamily: '\'Nunito Sans\'',
          textTransform: 'unset'
        }
      }
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: '600',
            textTransform: 'capitalize'
          },

          // "& .MuiDataGrid-withBorderColor": {
          //   borderColor: 'rgb(57 108 145 / 25%)'
          // },

          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: alpha(palette.primary.main, 0.05)
          },

          '& .MuiDataGrid-row:nth-of-type(odd)': {},

          '& .MuiDataGrid-columnHeader': {
            backgroundColor: palette.primary.main,
            color: 'white',
            fontFamily: '\'Nunito Sans\', sans-serif !important',
            fontWeight: '600',
            // fontWeight: 600,
            fontSize: '0.875rem',
            // lineHeight: '15px',
            alignItems: 'center',
            textAlign: 'center !important'
            // letterSpacing: '0.05em',
          }
        }
      }
    }
  },

  palette,

  typography: {

    fontFamily: '\'Nunito Sans\', sans-serif',

    body2: {
      fontFamily: '\'Nunito Sans\', sans-serif'
    }
  },
  esES
});

theme = responsiveFontSizes(theme);

export const tema = theme;
export default theme;
