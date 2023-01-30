/**
 * Shorthand to check if a validator returns an error
 * @param val Validator function response
 */
export function expectToFail(val: any) {
  expect(val).toBeTruthy();
}

/**
 * Shorthand to check if validator returns null
 * @param val Validator function response
 */
export function expectToPass(val: any) {
  expect(val).toBeNull();
}
