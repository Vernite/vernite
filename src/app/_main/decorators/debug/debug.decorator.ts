/** @deprecated */
export function Debug() {
  return function decorator(target: any) {
    target.debug = true;
  };
}
