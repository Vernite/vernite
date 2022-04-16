export class Utils {
  public static regexIndexOf(string: string, regex: RegExp, startPos: number = 0) {
    var indexOf = string.substring(startPos).search(regex);
    return indexOf >= 0 ? indexOf + startPos : indexOf;
  }
}
