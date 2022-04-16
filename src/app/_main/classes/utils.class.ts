/**
 * Utilities class with some useful methods not available in any libraries.
 */
export class Utils {
  /**
   * Function to find first occurrence of regex in string
   * @param string String to search in
   * @param regex Regex to search for
   * @param startPos Optional starting position in the string
   * @returns The index of the first match
   */
  public static regexIndexOf(string: string, regex: RegExp, startPos: number = 0) {
    var indexOf = string.substring(startPos).search(regex);
    return indexOf >= 0 ? indexOf + startPos : indexOf;
  }

  /**
   * Converts string from camelCase and PascalCase to snake_case
   * @param inputString String to convert
   * @returns string in snake_case
   */
  public static snakeCase(inputString: string) {
    return inputString
      .split('')
      .map((character, index) => {
        if (character == character.toUpperCase()) {
          if (index > 0) {
            return '_' + character.toLowerCase();
          } else {
            return character.toLowerCase();
          }
        } else {
          return character;
        }
      })
      .join('');
  }
}
