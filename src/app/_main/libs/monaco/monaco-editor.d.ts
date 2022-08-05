import { SelectionEditOperation } from './selection-edit.util';

declare module 'monaco-editor' {
  export namespace editor {
    export interface IStandaloneCodeEditor {
      executeSelectionEdits(
        edits: SelectionEditOperation,
        endCursorState?: ICursorStateComputer | Selection[],
      ): boolean;
    }
  }
}
