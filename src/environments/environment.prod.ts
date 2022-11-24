import app from '../../package.json';
/**
 * Variant of global environment file for production.
 */
export const environment = {
  production: true,
  apiURL: '/api',
  disableConsoleLog: false,
  version: app.version,
};
