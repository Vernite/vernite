export interface HTTPError {
  status: number;
  text: string;
}

export type Errors<T extends string> = T;

export type ErrorCodes<T extends string = string> = {
  [key in T]: {
    message: string;
  };
};

export interface ErrorCodesMap {
  [key: string | number]: keyof ErrorCodes;
}
