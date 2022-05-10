export class Enum {
  public static isNumeric(enumTypes: any): boolean {
    for (const key in Object.keys(enumTypes)) {
      if (Number(key)) {
        return true;
      }
    }

    return false;
  }
  public static keys(enumType: any): string[] {
    return Object.keys(enumType)
      .filter(k => !Number(k) && k != '0');
  }
  public static values(enumType: any): any[] {
    if (!Enum.isNumeric(enumType)) {
      return Object.keys(enumType);
    }

    return Object.values(enumType)
      .filter(v => Number(v) || v === '0')
      .map(v => Number(v));
  }
  public static entries(enumType: any): [string, any][] {
    if (!Enum.isNumeric(enumType)) {
      return Object.entries(enumType)
    }

    return Object.entries(enumType)
      .filter(e => Number(e[1]) || e[1] === '0' || e[1] === 0)
      .map(e => [e[0], Number(e[1])]);
  }
}
