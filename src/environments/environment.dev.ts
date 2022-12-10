import app from '../../package.json';
/**
 * Variant of global environment file for dev build (in public domain but under dev subdirectory).
 */
export const environment = {
  production: true,
  apiURL: '/dev/api',
  disableConsoleLog: false,
  version: app.version,
  disableIntegrationRegistryCheck: false,
  websocketUrl: 'wss://vernite.dev/dev/api/ws',
  logSocketMessages: false,
};
