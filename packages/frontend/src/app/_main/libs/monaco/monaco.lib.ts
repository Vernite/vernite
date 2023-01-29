// import { SelectionEditPlugin } from './plugins/selection-edit.plugin';
// import { monaco } from '@slashnotes/monaco-editor-esm';

// /**
//  * Monaco editor library
//  * Used to initialize monaco editor with markdown support
//  */
// export class Monaco {
//   /**
//    * Flag to check if monaco editor is initialized
//    */
//   private static _initialized = false;

//   /**
//    * Flag to check if monaco editor is initialized
//    */
//   public static get initialized() {
//     return this._initialized;
//   }

//   /**
//    * Initialize monaco editor
//    */
//   public static init() {
//     if (Monaco._initialized) return;

//     Monaco.loadPlugins();
//   }

//   /**
//    * Load monaco plugins
//    */
//   private static loadPlugins() {
//     const dummy = document.createElement('div');
//     const instance = monaco.editor.create(dummy) as any;
//     const prototype = instance.__proto__;

//     SelectionEditPlugin.init(prototype);
//   }
// }
