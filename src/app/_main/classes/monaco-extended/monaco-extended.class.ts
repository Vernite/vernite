import * as monaco from 'monaco-editor';

/** Monaco editor */
type MonacoEditor = monaco.editor.IStandaloneCodeEditor;

/** Monaco text selection */
type Selection = monaco.Selection;

/** Monaco edit operation */
type EditOperation = monaco.editor.IIdentifiedSingleEditOperation;

/** Monaco extended class */
export class MonacoExtended {
  /**
   * Insert text at position
   * @param editor Monaco editor
   * @param lineNumber Start line number
   * @param column Start column
   * @param text Text to insert
   */
  public static insertTextAt(
    editor: MonacoEditor,
    lineNumber: number,
    column: number,
    text: string,
  ) {
    editor.executeEdits('', [
      {
        range: {
          startLineNumber: lineNumber,
          startColumn: column,
          endLineNumber: lineNumber,
          endColumn: column,
        },
        text,
      },
    ]);
  }

  /**
   * Execute edits
   * @param editor Monaco editor
   * @param edits Edits
   */
  public static executeEdits(editor: MonacoEditor, edits: EditOperation[]) {
    for (const edit of edits) {
      if (edit.range?.startColumn && !edit.range?.endColumn)
        (edit.range as any).endColumn = edit.range.startColumn;
      if (edit.range?.startLineNumber && !edit.range?.endLineNumber)
        (edit.range as any).endLineNumber = edit.range.startLineNumber;
    }
    return editor.executeEdits('', edits);
  }

  /**
   * Remove text at position
   * @param editor Monaco editor
   * @param startLineNumber Start line number
   * @param startColumn Start column
   * @param endLineNumber End line number
   * @param endColumn End column
   */
  public static removeTextAt(
    editor: MonacoEditor,
    startLineNumber: number,
    startColumn: number,
    endLineNumber: number,
    endColumn: number,
  ) {
    editor.executeEdits('', [
      {
        range: {
          startLineNumber,
          startColumn,
          endLineNumber,
          endColumn,
        },
        text: null,
      },
    ]);
  }

  /**
   * Insert text before selection
   * @param editor Monaco editor
   * @param selection Monaco selection
   * @param text Text to insert
   */
  public static insertTextBeforeSelection(
    editor: MonacoEditor,
    selection: Selection,
    text: string,
  ) {
    MonacoExtended.insertTextAt(editor, selection.startLineNumber, selection.startColumn, text);
  }

  /**
   * Insert text after selection
   * @param editor Monaco editor
   * @param selection Monaco selection
   * @param text Text to insert
   */
  public static insertTextAfterSelection(editor: MonacoEditor, selection: Selection, text: string) {
    MonacoExtended.insertTextAt(editor, selection.endLineNumber, selection.endColumn, text);
  }

  /**
   * Remove text before and after selection
   * @param editor Monaco editor
   * @param selections Monaco selections
   * @param beforeSelectionText Text to insert before selection
   * @param afterSelectionText Text to insert after selection
   */
  public static insertTextBeforeAndAfterEachSelection(
    editor: MonacoEditor,
    selections: Selection[],
    beforeSelectionText: string,
    afterSelectionText: string = '',
  ) {
    const edits = ([] as any[]).concat(
      ...selections.map((selection) => {
        return [
          {
            range: {
              startLineNumber: selection.startLineNumber,
              startColumn: selection.startColumn,
              endLineNumber: selection.startLineNumber,
              endColumn: selection.startColumn,
            },
            text: beforeSelectionText,
          },
          {
            range: {
              startLineNumber: selection.endLineNumber,
              startColumn: selection.endColumn,
              endLineNumber: selection.endLineNumber,
              endColumn: selection.endColumn,
            },
            text: afterSelectionText,
          },
        ];
      }),
    );

    editor.executeEdits('', edits);
  }

  /**
   * Remove text before and after selection
   * @param editor Monaco editor
   * @param selections Monaco selections
   * @param beforeSelectionText Text to remove before selection
   * @param afterSelectionText Text to remove after selection
   */
  public static removeTextBeforeAndAfterEachSelection(
    editor: MonacoEditor,
    selections: Selection[],
    beforeSelectionText: string,
    afterSelectionText: string = '',
  ) {
    const model = editor.getModel();
    const afterSelectionTextLinesCount = (afterSelectionText.match(/\n/g) || [])?.length;
    const edits: any[] = [];

    if (!model) return;

    for (const selection of selections) {
      if (
        MonacoExtended.selectionStartWith(editor, selection, beforeSelectionText) &&
        MonacoExtended.selectionEndsWith(editor, selection, afterSelectionText)
      ) {
        edits.push({
          range: {
            startLineNumber: selection.startLineNumber,
            startColumn: selection.startColumn,
            endLineNumber:
              selection.startLineNumber + (beforeSelectionText.match(/\n/g) || [])?.length,
            endColumn: beforeSelectionText.replace(/.*\n/g, '').length + 1,
          },
          text: '',
        });
        edits.push({
          range: {
            startLineNumber: selection.endLineNumber - afterSelectionTextLinesCount,
            startColumn:
              model.getLineContent(selection.endLineNumber - afterSelectionTextLinesCount).length -
              (afterSelectionText.replace(/\n[^]*$/g, '').length - 1),
            endLineNumber: selection.endLineNumber,
            endColumn: selection.endColumn,
          },
          text: '',
        });
      }
    }

    editor.executeEdits('', edits);
  }

  /**
   * Check if selection start with text
   * @param editor Monaco editor
   * @param selection Monaco selection
   * @param text Text to check
   * @returns True if selection start with text
   */
  public static selectionStartWith(editor: MonacoEditor, selection: Selection, text: string) {
    const selectedValue = editor
      .getModel()
      ?.getValueInRange(selection, monaco.editor.EndOfLinePreference.LF);
    return selectedValue?.startsWith(text);
  }

  /**
   * Check if selection end with text
   * @param editor Monaco editor
   * @param selection Monaco selection
   * @param text Text to check
   * @returns True if selection end with text
   */
  public static selectionEndsWith(editor: MonacoEditor, selection: Selection, text: string) {
    const selectedValue = editor
      .getModel()
      ?.getValueInRange(selection, monaco.editor.EndOfLinePreference.LF);
    return selectedValue?.endsWith(text);
  }

  /**
   * Toggle text before and after selection
   * @param editor Monaco editor
   * @param beforeSelectionText text before selection
   * @param afterSelectionText text after selection
   */
  public static toggleEndAndStartOfEachSelection(
    editor: MonacoEditor,
    beforeSelectionText: string,
    afterSelectionText: string = '',
  ) {
    const selections = editor.getSelections();
    if (!selections) return;

    const shouldDelete = selections.some(
      (selection) =>
        MonacoExtended.selectionStartWith(editor, selection, beforeSelectionText) &&
        MonacoExtended.selectionEndsWith(editor, selection, afterSelectionText),
    );

    const mode: 'delete' | 'add' = shouldDelete ? 'delete' : 'add';

    if (mode === 'delete') {
      MonacoExtended.removeTextBeforeAndAfterEachSelection(
        editor,
        selections,
        beforeSelectionText,
        afterSelectionText,
      );
    } else {
      MonacoExtended.insertTextBeforeAndAfterEachSelection(
        editor,
        selections,
        beforeSelectionText,
        afterSelectionText,
      );
    }
  }
}
