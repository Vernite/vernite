import { Monaco } from './../../libs/monaco/monaco.lib';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { editor } from 'monaco-editor';
// eslint-disable-next-line unused-imports/no-unused-imports
import { marked, Renderer } from 'marked';
import hljs from 'highlight.js';
import {
  faBold,
  faCode,
  faFileCode,
  faItalic,
  faLink,
  faList,
  faListNumeric,
  faQuoteLeft,
  faUnderline,
} from '@fortawesome/free-solid-svg-icons';
import { Marked } from '@main/libs/marked/marked.lib';
import './textarea.theme';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent extends ControlAccessor implements OnInit, AfterViewInit {
  /**
   * Floating label text to display
   */
  @Input() floatingLabel?: string;

  /**
   * Static label text to display
   */
  @Input() staticLabel?: string;

  /**
   * Input placeholder text
   */
  @Input() placeholder: string = '';

  /**
   * Hint to display beneath the input to provide additional information of how to use the input
   */
  @Input() hint?: string;

  @Input() rows?: number = 4;

  @Input() cols?: number = 50;

  @ViewChild('input') input!: ElementRef<HTMLElement>;
  @ViewChild('output') output!: ElementRef<HTMLElement>;

  private renderer: Renderer = Marked.getRenderer();

  public mode: 'editor' | 'preview' = 'editor';

  /** @ignore */
  private editor: editor.IStandaloneCodeEditor | null = null;

  /** @ignore */
  faCode = faCode;

  /** @ignore */
  faUnderline = faUnderline;

  /** @ignore */
  faBold = faBold;

  /** @ignore */
  faItalic = faItalic;

  /** @ignore */
  faQuoteLeft = faQuoteLeft;

  /** @ignore */
  faList = faList;

  /** @ignore */
  faListNumeric = faListNumeric;

  /** @ignore */
  faLink = faLink;

  /** @ignore */
  faFileCode = faFileCode;

  override ngOnInit(): void {
    super.ngOnInit();
    Marked.init();
    Monaco.init();
    hljs.configure({ languages: [] });
  }

  ngAfterViewInit(): void {
    const container = this.input.nativeElement;
    const _editor = editor.create(container, {
      value: this.control.value || '',
      language: 'markdown',
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      wrappingStrategy: 'advanced',
      minimap: {
        enabled: false,
      },
      overviewRulerLanes: 0,
      theme: 'dark',
      wordBasedSuggestions: false,
    });
    const updateDimensions = () => {
      const contentHeight = Math.min(500, _editor.getContentHeight());
      container.style.height = `${contentHeight}px`;
      try {
        _editor.layout();
      } catch (e) {}
    };
    _editor.onDidContentSizeChange(updateDimensions);
    _editor.getModel()?.onDidChangeContent(() => {
      this.control.setValue(_editor.getValue());
    });
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);
    updateDimensions();
    this.editor = _editor;
  }

  openEditor() {
    this.mode = 'editor';
  }

  openPreview() {
    const { renderer } = this;

    this.output.nativeElement.innerHTML = marked.parse(this.editor?.getValue() || '', { renderer });
    this.output.nativeElement
      .querySelectorAll<HTMLElement>('pre code')
      .forEach((c: HTMLElement) => {
        hljs.highlightElement(c);
      });

    this.mode = 'preview';
  }

  applyUnderline() {
    this.editor?.executeSelectionEdits({
      before: '<u>',
      after: '</u>',
    });
    this.editor?.focus();
  }

  applyBold() {
    this.editor?.executeSelectionEdits({
      before: '**',
      after: '**',
    });
    this.editor?.focus();
  }

  applyItalic() {
    this.editor?.executeSelectionEdits({
      before: '*',
      after: '*',
    });
    this.editor?.focus();
  }

  applyLink() {
    this.editor?.executeSelectionEdits({
      before: '[',
      after: '](https://google.com)',
    });
    this.editor?.focus();
  }

  applyList() {
    this.editor?.executeSelectionEdits({
      before: '<ul>\n',
      after: '\n</ul>',
      beforeEachLine: '  <li>',
      afterEachLine: '</li>',
    });
    this.editor?.focus();
  }

  applyListNumeric() {
    this.editor?.executeSelectionEdits({
      before: '<ol>\n',
      after: '\n</ol>',
      beforeEachLine: '  <li>',
      afterEachLine: '</li>',
    });
    this.editor?.focus();
  }

  applyQuote() {
    this.editor?.executeSelectionEdits({
      beforeEachLine: '>',
    });
    this.editor?.focus();
  }

  applyCode() {
    this.editor?.executeSelectionEdits({
      before: '`',
      after: '`',
    });
    this.editor?.focus();
  }

  applyCodeBlock() {
    this.editor?.executeSelectionEdits({
      before: '```javascript\n',
      after: '\n```',
    });
    this.editor?.focus();
  }
}
