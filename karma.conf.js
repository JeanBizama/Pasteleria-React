module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.test.{js,jsx}'
    ],
    preprocessors: {
      'src/**/*.test.{js,jsx}': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: 'asset/resource'
          }
        ]
      },
      resolve: { extensions: ['.js', '.jsx'] },
      devtool: 'inline-source-map'
    },

    // reporters / browsers
    reporters: ['progress'],

    // custom launcher para ChromeHeadless estable con flags útiles en CI / Windows
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--remote-debugging-port=9222'
        ]
      }
    },
    browsers: ['ChromeHeadlessNoSandbox'],

    // aumentar timeouts/tolerancias para evitar desconexiones por carga lenta
    browserNoActivityTimeout: 120000,    // ms to wait without any activity
    captureTimeout: 120000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 20000,

    singleRun: true,
    concurrency: Infinity
  });
};