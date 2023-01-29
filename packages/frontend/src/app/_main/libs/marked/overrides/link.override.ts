import { Renderer } from 'marked';

/**
 * Override link renderer to open external links in new tab
 * @param renderer marked editor renderer
 * @returns marked editor renderer
 */
export function linkOverride(renderer: Renderer) {
  const linkRenderer = renderer.link;
  renderer.link = (href, title, text) => {
    if (!href) return linkRenderer.call(renderer, href, title, text);

    const localLink = href.startsWith(`${location.protocol}//${location.hostname}`);
    const html = linkRenderer.call(renderer, href, title, text);
    return localLink
      ? html
      : html.replace(/^<a /, `<a target="_blank" rel="noreferrer noopener nofollow" `);
  };
  return renderer;
}
