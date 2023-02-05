// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const path = require('path');

module.exports = function (configBuilderParams) {
  return function (config) {
    config.set({
      basePath: '../',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('@angular-devkit/build-angular/plugins/karma'),
        require('karma-chrome-launcher'),
        require('karma-coverage'),
        require('karma-firefox-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-jasmine'),
        require('karma-spec-reporter'),
        require('karma-structured-json-reporter'),
      ],
      files: [
        'src/tests/karma/karma.css',
        'src/tests/karma/karma.js',
      ],
      client: {
        jasmine: {
          // you can add configuration options for Jasmine here
          // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
          // for example, you can disable the random execution with `random: false`
          // or set a specific seed with `seed: 4321`
          random: false,
        },
        clearContext: false, // leave Jasmine Spec Runner output visible in browser
      },
      jasmineHtmlReporter: {
        suppressAll: true, // removes the duplicated traces
      },
      coverageReporter: {
        dir: path.join(configBuilderParams.__dirname, './coverage'),
        subdir: '.',
        reporters: [
          { type: 'html' },
          { type: 'json' },
          { type: 'text-summary' },
          { type: 'json-summary' },
          { type: 'lcov' },
        ],
      },
      reporters: ['spec', 'kjhtml', 'json-result'],
      jsonResultReporter: {
        outputFile: 'coverage/report.json',
        isSynchronous: true,
      },
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Firefox'],
      singleRun: false,
      restartOnFileChange: true,
      customLaunchers: {
        Chrome_without_security: {
          base: 'Chrome',
          flags: [
            '--disable-web-security',
            '--remote-debugging-address=0.0.0.0',
            '--remote-debugging-port=9222',
          ],
          debug: true,
        },
      },
    });
  };
}
