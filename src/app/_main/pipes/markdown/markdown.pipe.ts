import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PipeTransform, Pipe } from '@angular/core';
import { marked, Renderer } from 'marked';
import { Marked } from '@main/libs/marked/marked.lib';
import hljs from 'highlight.js';

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  private renderer: Renderer<any>;

  constructor(private sanitizer: DomSanitizer) {
    Marked.init();
    this.renderer = Marked.getRenderer();
  }

  transform(value: string): SafeHtml {
    const innerHTML = marked.parse(value || '', { renderer: this.renderer });
    // TODO: Add hljs to the marked options (https://marked.js.org/using_advanced)
    // this.output.nativeElement
    //   .querySelectorAll<HTMLElement>('pre code')
    //   .forEach((c: HTMLElement) => {
    //     hljs.highlightElement(c);
    //   });

    return this.sanitizer.bypassSecurityTrustHtml(marked(value));
  }
}
