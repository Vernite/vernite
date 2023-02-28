import { isString } from 'lodash-es';

/**
 * Utilities class with some useful methods not available in any libraries.
 *
 * TODO: Move this utility functions outside of class
 */
export class Utils {
  /**
   * Function to find first occurrence of regex in string
   * @param string String to search in
   * @param regex Regex to search for
   * @param startPos Optional starting position in the string
   * @deprecated Use string.search(regex) instead
   * @returns The index of the first match
   */
  public static regexIndexOf(string: string, regex: RegExp, startPos: number = 0) {
    let indexOf = string.substring(startPos).search(regex);
    return indexOf >= 0 ? indexOf + startPos : indexOf;
  }

  /**
   * Check if object has all the properties from array
   * @param object Object to check
   * @param keys keys to search for
   * @returns true if object has all of the specified properties, false otherwise.
   */
  public static has(object: any, keys: string[]) {
    for (const key of keys) {
      if (!object.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks if passed character is a letter
   * @param char Character to check
   * @returns
   */
  public static isLetter(char: String) {
    if (char.length > 1) return false;
    return (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z');
  }

  /**
   * Checks if passed string is an ISO date string
   * ex. 2011-10-05T14:48:00.000Z
   * @param text
   * @returns
   */
  public static isISODate(text: any) {
    if (!isString(text)) return false;
    if ((new Date(text) as any) !== 'Invalid Date' && !isNaN(new Date(text) as any)) {
      if (text === new Date(text).toISOString()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
