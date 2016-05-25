exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumServerJar: '/usr/local/lib/node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',
  seleniumPort: null,
  chromeDriver: '/usr/local/lib/node_modules/protractor/selenium/chromedriver_2.21',
  specs: ['e2e-spec/*.js'],
  jasmineNodeOpts: {
    // If true, display spec names.
    isVerbose: true,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 10000
  }
};
