import { marked, Renderer } from 'marked';
import { emoji } from './extensions/marked-emoji-extension';
import { linkOverride } from './overrides/link.override';

export class Marked {
  private static _initialized = false;

  public static init() {
    if (Marked._initialized) return;

    marked.use({
      extensions: [emoji],
    });

    Marked._initialized = true;
  }

  public static getRenderer() {
    let renderer = new Renderer();

    renderer = linkOverride(renderer);

    return renderer;
  }
}
