import app from '../../package.json';
/**
 * Variant of global environment file for production.
 */
export const environment = {
  production: true,
  apiURL: '/api',
  disableConsoleLog: false,
  version: app.version,
  disableIntegrationRegistryCheck: false,
  websocketUrl: 'wss://vernite.dev/api/ws',
  logSocketMessages: false,
};
