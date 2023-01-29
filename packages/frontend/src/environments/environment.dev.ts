import app from '../../package.json';
/**
 * Variant of global environment file for dev build (in public domain but under dev subdirectory).
 */
export const environment = {
  production: true,
  apiURL: '/api',
  disableConsoleLog: false,
  version: app.version,
  disableIntegrationRegistryCheck: false,
  domain: 'insiders.vernite.dev',
  websocketUrl: 'wss://insiders.vernite.dev/api/ws',
  logSocketMessages: false,
  captchaSiteKey: '6LcUZ8gfAAAAAGpAZpXpV1K8NO_7-rSCPD-tGtR9',
};
