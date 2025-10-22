const fs = require('fs');

module.exports = function(config) {
  // Ensure CHROME_BIN points to a Chromium browser. If Google Chrome is not installed,
  // try to use Microsoft Edge (Chromium) binary so we can still run ChromeHeadless.
  if (!process.env.CHROME_BIN) {
    const candidates = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
    ];

    for (const p of candidates) {
      try {
        if (fs.existsSync(p)) {
          process.env.CHROME_BIN = p;
          break;
        }
      } catch (_) {}
    }
  }

  const selectedBrowsers = ['ChromeHeadlessNoSandbox'];

  config.set({
    frameworks: ['jasmine'],
    files: [
      // setup de matchers jasmine-dom (antes de los tests)
      'src/tests/setupJasmine.js',
      'src/**/*.test.{js,jsx}'
    ],
    preprocessors: {
      'src/tests/setupJasmine.js': ['webpack'],
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
    browsers: selectedBrowsers,

    // aumentar timeouts/tolerancias para evitar desconexiones por carga lenta
    browserNoActivityTimeout: 120000,    // ms to wait without any activity
    captureTimeout: 120000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 20000,

    singleRun: true,
    concurrency: Infinity
  });
};