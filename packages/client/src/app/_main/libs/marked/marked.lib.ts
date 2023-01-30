import { marked, Renderer } from 'marked';
import { emoji } from './extensions/marked-emoji-extension';
import { linkOverride } from './overrides/link.override';

/**
 * Marked library
 */
export class Marked {
  /**
   * Flag to check if marked is initialized
   */
  private static _initialized = false;

  /**
   * Initialize marked library
   */
  public static init() {
    if (Marked._initialized) return;

    marked.use({
      extensions: [emoji],
    });

    Marked._initialized = true;
  }

  /**
   * Get marked renderer
   * @returns marked renderer
   */
  public static getRenderer() {
    let renderer = new Renderer();

    renderer = linkOverride(renderer);

    return renderer;
  }
}
