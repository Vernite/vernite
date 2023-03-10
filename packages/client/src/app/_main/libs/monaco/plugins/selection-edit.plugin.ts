import { snakeCase } from 'lodash-es';
import { CursorStateComputer, EditOperation, Editor, Selection } from '../typings';

/**
 * Composed operations to modify selections
 */
export type SelectionEditOperation = { [key in SelectionEditOperationType]: string };

/**
 * Selection edit operation type
 */
export enum SelectionEditOperationType {
  before = 'BEFORE',
  after = 'AFTER',
  beforeEachLine = 'BEFORE_EACH_LINE',
  afterEachLine = 'AFTER_EACH_LINE',
}

/**
 * Selection edit operation order
 */
export const SelectionEditOperationOrder = {
  before: 1,
  after: 4,
  beforeEachLine: 2,
  afterEachLine: 3,
};

/**
 * Selection edit operation converter to convert internal operations to monaco operations
 */
const SelectionEditOperationConverter: {
  [key in SelectionEditOperationType]: (
    editor: Editor,
    selection: Selection,
    value: string,
  ) => EditOperation[];
} = {
  [SelectionEditOperationType.before]: (editor: Editor, selection: Selection, value: string) => {
    return [
      {
        range: {
          startColumn: 1,
          startLineNumber: selection.startLineNumber,
          endColumn: 1,
          endLineNumber: selection.startLineNumber,
        },
        text: value,
      },
    ] as EditOperation[];
  },
  [SelectionEditOperationType.after]: (editor: Editor, selection: Selection, value: string) => {
    const column = (editor.getModel()?.getLineLength(selection.endLineNumber) || 0) + 1;

    return [
      {
        range: {
          startColumn: column,
          startLineNumber: selection.endLineNumber,
          endColumn: column,
          endLineNumber: selection.endLineNumber,
        },
        text: value,
      },
    ] as EditOperation[];
  },
  [SelectionEditOperationType.beforeEachLine]: (
    editor: Editor,
    selection: Selection,
    value: string,
  ) => {
    const startLine = selection.startLineNumber;
    const endLine = selection.endLineNumber;

    const difference = Math.abs(startLine - endLine) + 1;
    const offset = Math.min(startLine, endLine);
    const indexes = [...new Array(difference).keys()].map((k) => k + offset);

    return indexes.map((line) => ({
      range: {
        startLineNumber: line,
        startColumn: 1,
        endLineNumber: line,
        endColumn: 1,
      },
      text: value,
    })) as EditOperation[];
  },
  [SelectionEditOperationType.afterEachLine]: (
    editor: Editor,
    selection: Selection,
    value: string,
  ) => {
    const model = editor.getModel();
    if (!model) return [];

    const startLine = selection.startLineNumber;
    const endLine = selection.endLineNumber;

    const difference = Math.abs(startLine - endLine) + 1;
    const offset = Math.min(startLine, endLine);
    const indexes = [...new Array(difference).keys()].map((k) => k + offset);

    return indexes.map((line) => {
      const column = model.getLineLength(line) + 1;

      return {
        range: {
          startLineNumber: line,
          startColumn: column,
          endLineNumber: line,
          endColumn: column,
        },
        text: value,
      } as EditOperation;
    });
  },
};

/**
 * Selection edit plugin
 */
export class SelectionEditPlugin {
  /**
   * Initialize plugin
   * @param prototype Monaco editor prototype
   */
  public static init(prototype: any) {
    prototype.getSelectionEdits = function (edits: SelectionEditOperation) {
      return SelectionEditPlugin.getSelectionEdits.bind(this)(edits);
    };

    prototype.executeSelectionEdits = function (
      edits: SelectionEditOperation,
      endCursorState?: CursorStateComputer | Selection[],
    ) {
      return SelectionEditPlugin.executeSelectionEdits.bind(this)(edits, endCursorState);
    };
  }

  /**
   * Get selection edits
   * @param edits Selection edits operations to perform
   * @returns Edit operations
   */
  public static getSelectionEdits(edits: SelectionEditOperation): EditOperation[] {
    const editor: Editor = this as any;
    const selections = editor.getSelections();
    let _edits: EditOperation[] = [];

    if (!selections) return [];

    for (const selection of selections) {
      const entries = Object.entries(edits).sort((a: [string, string], b: [string, string]) => {
        return (
          (SelectionEditOperationOrder as any)[a[0] as any] -
          (SelectionEditOperationOrder as any)[b[0] as any]
        );
      });
      for (const [key, value] of entries) {
        const _key = snakeCase(key).toUpperCase();
        _edits = [
          ..._edits,
          ...SelectionEditOperationConverter[_key as SelectionEditOperationType](
            editor,
            selection,
            value,
          ),
        ];
      }
    }
    return _edits;
  }

  /**
   * Execute selection edits
   * @param edits Selection edits operations to perform
   * @param endCursorState Cursor state after edits
   */
  public static executeSelectionEdits(
    edits: SelectionEditOperation,
    endCursorState?: CursorStateComputer | Selection[],
  ) {
    const editor: Editor = this as any;
    const _edits = this.getSelectionEdits(edits);
    editor.executeEdits('', _edits, endCursorState);
  }
}
