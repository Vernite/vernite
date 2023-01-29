/**
 * HTTP Error interface
 */
export interface HTTPError {
  /** Error status code */
  status: number;
  /** Error status text */
  text: string;
}

/**
 * HTTP error messages list type
 */
export type Errors<T extends string> = T;

/**
 * HTTP error messages map type
 */
export type ErrorCodes<T extends string = string> = {
  [key in T]: {
    message: string;
  };
};

/**
 * HTTP error messages map from status codes to error messages
 */
export interface ErrorCodesMap {
  [key: string | number]: keyof ErrorCodes;
}
