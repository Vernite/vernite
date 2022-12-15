import app from '../../package.json';
/**
 * Variant of global environment file for production.
 */
export const environment = {
  production: true,
  apiURL: '/api',
  disableConsoleLog: true,
  version: app.version,
  disableIntegrationRegistryCheck: false,
  websocketUrl: 'wss://vernite.dev/api/ws',
  logSocketMessages: false,
  captchaSiteKey: '6LcUZ8gfAAAAAGpAZpXpV1K8NO_7-rSCPD-tGtR9',
};
