import * as Color from 'color';

export class ColorUtils {
  public static isHex(color: string) {
    return /^#[0-9A-F]{6}$/i.test(color);
  }

  public static isHexA(color: string) {
    return /^#[0-9A-F]{8}$/i.test(color);
  }

  public static isRgb(color: string) {
    return /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i.test(color);
  }

  public static isRgba(color: string) {
    return /^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i.test(color);
  }

  public static isHsv(color: string) {
    return /^hsv\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i.test(color);
  }

  public static isHsva(color: string) {
    return /^hsva\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i.test(color);
  }

  public static colorFromString(color: string): Color {
    if (ColorUtils.isHex(color)) {
      return Color(color);
    } else if (ColorUtils.isHexA(color)) {
      return Color(color);
    } else if (ColorUtils.isRgb(color)) {
      return Color(color);
    } else if (ColorUtils.isRgba(color)) {
      return Color(color);
    } else if (ColorUtils.isHsv(color)) {
      return Color(color);
    } else if (ColorUtils.isHsva(color)) {
      return Color(color);
    } else {
      return Color(color);
    }
  }

  public static colorToBytes(color: Color): number {
    return color.rgbNumber();
  }
}
