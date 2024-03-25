/**	
 * TS suggestions in monaco don't not the use same trigger characters as VSCode	
 * Originally reported here https://github.com/microsoft/monaco-editor/discussions/3711	
 * Monaco trigger characters https://github.com/microsoft/monaco-editor/blob/main/src/language/typescript/languageFeatures.ts#L436	
 * VScode trigger characters https://github.com/microsoft/vscode/blob/main/extensions/typescript-language-features/src/languageFeatures/completions.ts#L668	
 */	
declare module 'monaco-editor/esm/vs/language/typescript/tsMode' {	
    type CompletionItemProvider =	
      import('monaco-editor').languages.CompletionItemProvider;	
    export class SuggestAdapter implements CompletionItemProvider {	
      constructor(	
        protected _worker: (	
          ...uris: import('monaco-editor').Uri[]	
        ) => Promise<	
          import('monaco-editor').languages.typescript.TypeScriptWorker	
        >,	
      );	
      triggerCharacters?: string[];	
      /**	
       * Provide completion items for the given position and document.	
       */	
      provideCompletionItems(	
        model: import('monaco-editor').editor.ITextModel,	
        position: import('monaco-editor').Position,	
        context: import('monaco-editor').languages.CompletionContext,	
        token: import('monaco-editor').CancellationToken,	
      ): import('monaco-editor').languages.ProviderResult<	
        import('monaco-editor').languages.CompletionList	
      >;	
      resolveCompletionItem?(	
        item: import('monaco-editor').languages.CompletionItem,	
        token: import('monaco-editor').CancellationToken,	
      ): import('monaco-editor').languages.ProviderResult<	
        import('monaco-editor').languages.CompletionItem	
      >;	
    }	
  }