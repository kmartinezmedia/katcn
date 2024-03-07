/**
 * TS suggestions in monaco don't not the use same trigger characters as VSCode
 * Originally reported here https://github.com/microsoft/monaco-editor/discussions/3711
 * Monaco trigger characters https://github.com/microsoft/monaco-editor/blob/main/src/language/typescript/languageFeatures.ts#L436
 * VScode trigger characters https://github.com/microsoft/vscode/blob/main/extensions/typescript-language-features/src/languageFeatures/completions.ts#L668
 */
declare module 'monaco-editor/esm/vs/language/typescript/tsMode' {
  import type * as monacoType from 'monaco-editor';
  export class SuggestAdapter
    implements monacoType.languages.CompletionItemProvider
  {
    constructor(
      protected _worker: (
        ...uris: monacoType.Uri[]
      ) => Promise<monacoType.languages.typescript.TypeScriptWorker>,
    );
    triggerCharacters?: string[];
    /**
     * Provide completion items for the given position and document.
     */
    provideCompletionItems(
      model: monacoType.editor.ITextModel,
      position: monacoType.Position,
      context: monacoType.languages.CompletionContext,
      token: monacoType.CancellationToken,
    ): monacoType.languages.ProviderResult<monacoType.languages.CompletionList>;
    resolveCompletionItem?(
      item: monacoType.languages.CompletionItem,
      token: monacoType.CancellationToken,
    ): monacoType.languages.ProviderResult<monacoType.languages.CompletionItem>;
  }
}
