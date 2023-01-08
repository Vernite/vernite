import { AfterViewInit, ElementRef, OnInit, Component, Input, ViewChild } from '@angular/core';
import { ControlAccessor } from '@main/classes/control-accessor/control-accessor.class';
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
import { SelectionEditPlugin } from '../../libs/monaco/plugins/selection-edit.plugin';

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

  public editorOptions = {
    language: 'markdown',
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    wrappingStrategy: 'advanced',
    minimap: {
      enabled: false,
    },
    overviewRulerLanes: 0,
    theme: 'vs-dark',
    wordBasedSuggestions: false,
  };

  private editor: any;

  /** Monaco editor theme */
  private theme: any;

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
    hljs.configure({ languages: [] });
  }

  ngAfterViewInit(): void {}

  onEditorInit(editor: any) {
    this.editor = editor;

    if (!this.theme) {
      SelectionEditPlugin.init(editor.__proto__);
      (window as any).monaco.editor.defineTheme('dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#364053',
        },
      });

      this.theme = true;
    }

    editor.updateOptions({ theme: 'dark' });
  }

  openEditor() {
    this.mode = 'editor';
  }

  openPreview() {
    const { renderer } = this;

    this.output.nativeElement.innerHTML = marked.parse(this.control.value || '', { renderer });
    this.output.nativeElement
      .querySelectorAll<HTMLElement>('pre code')
      .forEach((c: HTMLElement) => {
        hljs.highlightElement(c);
      });

    this.mode = 'preview';
  }

  override writeValue(value: any) {
    super.writeValue(value);
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
