import { isNumber } from 'lodash-es';

/**
 * Utility enum functions for typescript
 */
export class Enum {
  /**
   * Tests if the given enum is numeric - contains at leas one number as value.
   * @param enumType enum to test
   * @returns true or false based on whether enum has numeric values
   */
  public static isNumeric(enumType: any): enumType is { [key: string]: number } {
    return Object.values(enumType).some((val) => isNumber(val));
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
  public static keys<T extends object>(enumType: T): Array<keyof T> {
    return Object.keys(enumType).filter((k) => !Number(k) && k != '0') as (keyof T)[];
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
  public static values<T extends object>(enumType: T): (string | number)[] {
    if (!Enum.isNumeric(enumType)) {
      return Object.values(enumType);
    }

    return Object.values(enumType)
      .filter((v) => Number(v))
      .map((v) => Number(v)) as any;
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
  public static entries<T extends object>(enumType: T): [keyof T, T[keyof T]][] {
    if (!Enum.isNumeric(enumType)) {
      return Object.entries(enumType) as [keyof T, T[keyof T]][];
    }

    return Object.entries(enumType)
      .filter((e) => isNumber(e[1]))
      .map((e) => [e[0], Number(e[1])]) as any as [keyof T, T[keyof T]][];
  }
}
