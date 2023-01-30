/** User authorization session */
export interface UserSession {
  /** Id of the session */
  id: number;

  /** User agent of the session */
  userAgent: string;

  /** IP address of the session */
  ip: string;

  /** Date when session was last used */
  lastUsed: number;

  /** Information if session should be remembered after app close */
  remembered: boolean;

  /** GeoIP information of the session */
  geoip: {
    /** City of the session */
    city: string;

    /** Country of the session */
    country: string;
  };

  /** Information if session is current */
  current: boolean;
}
