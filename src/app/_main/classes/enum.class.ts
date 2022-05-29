/**
 * Utility enum functions for typescript
 */
export class Enum {
  /**
   * Tests if the given enum is numeric - contains at leas one number as value.
   * @param enumType enum to test
   * @returns true or false based on whether enum has numeric values
   */
  public static isNumeric(enumType: any): boolean {
    for (const key of Object.keys(enumType)) {
      if (Number(key)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Function to get enum keys.
   * @param enumType enum to get keys from
   * @example
   * enum TestEnum {
   *   One = 1,
   *   Two = 2,
   *   Three = 3,
   * }
   * Enum.keys(TestEnum) // ['One', 'Two', 'Three']
   * @returns array of enum keys
   */
  public static keys(enumType: any): string[] {
    return Object.keys(enumType).filter((k) => !Number(k) && k != '0');
  }

  /**
   * Function to get enum values.
   * @param enumType enum to get values from
   * @example
   * enum TestEnum {
   *   One = 1,
   *   Two = 2,
   *   Three = 3,
   * }
   * Enum.values(TestEnum) // [1, 2, 3]
   * @returns array of enum values
   */
  public static values(enumType: any): any[] {
    if (!Enum.isNumeric(enumType)) {
      return Object.values(enumType);
    }

    return Object.values(enumType)
      .filter((v) => Number(v) || v === '0')
      .map((v) => Number(v));
  }

  /**
   * Function to get enum value by key.
   * @param enumType enum to get entries from
   * @example
   * enum TestEnum {
   *   One = 1,
   *   Two = 2,
   *   Three = 3,
   * }
   * Enum.entries(TestEnum) // [['One', 1], ['Two', 2], ['Three', 3]]
   * @returns array of enum entries
   */
  public static entries(enumType: any): [string, any][] {
    if (!Enum.isNumeric(enumType)) {
      return Object.entries(enumType);
    }

    return Object.entries(enumType)
      .filter((e) => Number(e[1]) || e[1] === '0' || e[1] === 0)
      .map((e) => [e[0], Number(e[1])]);
  }
}
