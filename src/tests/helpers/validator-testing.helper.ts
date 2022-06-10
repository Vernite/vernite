export function expectToFail(val: any) {
  expect(val).toBeTruthy();
}

export function expectToPass(val: any) {
  expect(val).toBeNull();
}
