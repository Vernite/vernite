/**
 * Object to mock no content provided response. Mainly used when request checks
 * for data in body, but nothing is provided.
 */
export const NO_CONTENT_PROVIDED = {
  status: 400,
  body: {
    message: 'No data provided',
  },
};

/**
 * Object to mock success response. Used often to notify app that request was
 * successful.
 */
export const SUCCESS = {
  status: 200,
  body: {
    message: 'Success',
  },
};
