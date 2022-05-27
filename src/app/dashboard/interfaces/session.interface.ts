export interface UserSession {
  id: number;
  userAgent: string;
  ip: string;
  lastUsed: string;
  remembered: boolean;
  geoip: {
    city: string;
    country: string;
  };
  current: boolean;
}
