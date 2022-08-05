import { SelectionEditPlugin } from './plugins/selection-edit.plugin';
import { editor } from 'monaco-editor';

export class Monaco {
  private static _initialized = false;

  public static get initialized() {
    return this._initialized;
  }

  public static init() {
    if (Monaco._initialized) return;

    Monaco.loadPlugins();
  }

  private static loadPlugins() {
    const dummy = document.createElement('div');
    const instance = editor.create(dummy) as any;
    const prototype = instance.__proto__;

    SelectionEditPlugin.init(prototype);
  }
}
