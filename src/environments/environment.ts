// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
  version: require('../../package.json').version,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
