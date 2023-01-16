import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform, Pipe } from '@angular/core';
import { Renderer } from 'marked';
import { Marked } from '@main/libs/marked/marked.lib';

/**
 * Markdown pipe - display markdown
 */
@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  /** Markdown renderer */
  private renderer: Renderer<any>;

  constructor(private sanitizer: DomSanitizer) {
    Marked.init();
    this.renderer = Marked.getRenderer();
  }

  /**
   * Display markdown
   * @param value - markdown to display
   * @returns markdown
   */
  transform(value: string): string {
    // const innerHTML = marked.parse(value || '', { renderer: this.renderer });
    // TODO: Add hljs to the marked options (https://marked.js.org/using_advanced)
    // this.output.nativeElement
    //   .querySelectorAll<HTMLElement>('pre code')
    //   .forEach((c: HTMLElement) => {
    //     hljs.highlightElement(c);
    //   });

    // return this.sanitizer.sanitize(SecurityContext.HTML, marked(value)) || '';
    return value;
  }
}
