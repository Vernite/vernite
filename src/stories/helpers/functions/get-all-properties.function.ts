/** Get all properties/attributes of an object */
export function getAllProperties(obj: any) {
  // Recursively get properties up [[Prototype]] chain
  function loop(obj: any): string[] {
    let props = Object.getOwnPropertyNames(obj);
    let proto = Object.getPrototypeOf(obj);

    // Stop at null
    if (proto !== null) {
      return props.concat(loop(proto));
    }
    return props;
  }

  let allProps = loop(obj);

  // Remove duplicates
  return allProps.filter((prop: any, i: any) => !allProps.includes(prop, i + 1));
}
