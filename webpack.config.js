const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = async (
  _,
  { mode = 'development' },
) => {
  return {
    entry: path.join(__dirname, 'src', 'index.jsx'),
    target: 'web',
    mode,

    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
    output: {
      path: path.join(__dirname, 'build'),
      publicPath: 'auto',
      chunkFilename: 'js/[id].[contenthash].js',
      filename: 'js/[name].[contenthash].js',
      clean: true,
    },
    devServer: {
      hot: true,
      liveReload: true,
      open: false,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'src', 'public'),
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
      },
      // client: {
      //   webSocketURL: 'ws://devpj.gov.py:8021/ws',
      // },
      allowedHosts: 'all',
      compress: false,
      port: '8000',
    },
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      extensions: ['.css', '.js', '.jsx', '.scss'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [].filter(Boolean),
            },
          },
        },

        {
          test: /\.(png|jpg?g|gif|svg)$/i,
          type: 'asset/resource',
        },

        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src'),
          use: ['style-loader', 'css-loader'],
        },

        // Font files
        {
          test: /\.(woff|woff2|ttf|otf)$/,
          type: 'asset/resource',
        },
      ],
    },

    plugins: [
      (mode === 'development') && new ReactRefreshPlugin(),

      new ModuleFederationPlugin({
        name: 'HostApp',
        filename: 'js/remote-app-entry.js',

        exposes: {
          './Autenticacion': './src/app/compartidos/autenticacion/index.js',
          './Navegacion': './src/app/compartidos/navegacion',
        },

        shared: [
          {
            react: {
              eager: false,
              singleton: true,
              requiredVersion: deps.react,
            },

            'react-dom': {
              singleton: true,
              eager: false,
              requiredVersion: deps['react-dom'],
            },
          },
        ],
        remotes: {
          HostApp:  `promise new Promise(resolve => {
                      const urlParams = new URLSearchParams(window.location.search)

                      // This part depends on how you plan on hosting and versioning your federated modules
                      const remoteUrlWithVersion = 'http://localhost:8000/js/remote-app-entry.js?' + Math.round(Math.random() * 165165498000007)
                      const script = document.createElement('script')
                      
                      script.src = remoteUrlWithVersion
                      script.onload = () => {
                        // the injected script has loaded and is available on window
                        // we can now resolve this Promise
                        const proxy = {
                          get: (request) => window.HostApp.get(request),
                          init: (arg) => {
                            try {
                              return window.HostApp.init(arg)
                            } catch(e) {
                              console.log('remote container already initialized')
                            }
                          }
                        }
                        resolve(proxy)
                      }
                      // inject this script with the src set to the versioned remoteEntry.js
                      document.head.appendChild(script);
                    })
                    `


            //'HostApp@http://172.30.8.221:8009/js/remote-app-entry.js',
        },
      }),

      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'public', 'index.html'),
      }),
      // new ExternalTemplateRemotesPlugin(),

      // new MFLiveReloadPlugin({
      //   port: 8000, // the port your app runs on
      //   container: 'appshell', // the name of your app, must be unique
      //   standalone: true, // false uses chrome extention
      // }),
    ],
  };
};
