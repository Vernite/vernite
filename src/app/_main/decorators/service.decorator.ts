export function Service() {
  return function decorator(target: any) {
    if (!(window as any).SERVICES) {
      (window as any).SERVICES = [];
    }

    (window as any).SERVICES.push(target);
  };
}
