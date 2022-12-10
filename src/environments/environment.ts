// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import app from '../../package.json';

/**
 * Global environment configuration object, replaced in configurations other than development. Stores build specific data.
 */
export const environment = {
  /**
   * Whether the application is running in production mode.
   */
  production: false,

  /**
   * API URL for the backend.
   */
  apiURL: '/api',

  /**
   * Whether to disable console logging.
   */
  disableConsoleLog: false,

  /**
   * App version
   */
  version: app.version,

  disableIntegrationRegistryCheck: false,

  /**
   * Url to the websocket server.
   */
  websocketUrl: 'ws://localhost:4200/api/ws',

  /**
   * Whether to log socket messages (can also be enabled with console command in runtime).
   */
  logSocketMessages: false,
};
