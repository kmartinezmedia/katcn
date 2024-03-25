'use client';

import { Editor } from '@monaco-editor/react';
import type * as monacoType from 'monaco-editor';
import { VStack } from 'katcn';
import { useEffect, useRef, useState } from 'react';
import { encode } from 'base64-url';
import { PrettierFormatProvider } from '../utils/prettier';

export type MonacoInstance = typeof monacoType;
export type EditorInstance = monacoType.editor.IStandaloneCodeEditor;
export type DtsLib = { content: string; filePath: string };
export type DtsLibs = DtsLib[];
export type UserModel = monacoType.editor.ITextModel;
export type TypescriptWorker = monacoType.languages.typescript.TypeScriptWorker;
export type TypeError = monacoType.editor.IMarkerData;
export type OnMount = (params: Required<CodeEditorRefs>) => void;
export type OnChange = (
  value: string | undefined,
  ev: monacoType.editor.IModelContentChangedEvent,
) => void | Promise<void>;

export interface CodeEditorProps {
  className?: string;
  userCode: string;
  dtsLibs?: DtsLibs;
  tsconfig?: monacoType.languages.typescript.CompilerOptions;
  onMount?: OnMount;
  onChange?: OnChange;
}

export interface CodeEditorRefs {
  monaco?: MonacoInstance;
  editor?: EditorInstance;
  tsworker?: TypescriptWorker;
}

const USER_CODE_PATH = 'file:///user.tsx';

export function CodeEditor({
  userCode,
  dtsLibs = [],
  onChange,
  onMount,
}: CodeEditorProps) {
  const refs = useRef<CodeEditorRefs>({
    monaco: undefined,
    editor: undefined,
    tsworker: undefined,
  });

  useEffect(() => {
    const saveHandler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.code === 'KeyS') {
        e.preventDefault();
        refs.current.editor?.getAction('editor.action.formatDocument')?.run();
      }
    };

    document.addEventListener('keydown', saveHandler);

    return () => {
      document.removeEventListener('keydown', saveHandler);
    };
  }, []);

  return (
    <VStack height="100vh" width="full">
      <Editor
        defaultLanguage="typescript"
        language="typescript"
        theme="vs-dark"
        className="overflow-hidden"
        height="100%"
        width="50%"
        defaultValue={userCode}
        value={userCode}
        defaultPath={USER_CODE_PATH}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
        onMount={async (editor, monaco) => {
          const stringToUri = monaco.Uri.parse;

          /**
           * Avoid flashing type errors on initial load by loading dts files first
           */

          /* -------------------------------------------------------------------------- */
          /*                               ADD REACT TYPES                              */
          /* -------------------------------------------------------------------------- */
          const reactTypesResp = await fetch(
            'https://unpkg.com/@types/react@18.2.0/index.d.ts',
          );
          const reactTypes = await reactTypesResp.text();
          monaco.languages.typescript.typescriptDefaults.addExtraLib(
            reactTypes,
            'file:///node_modules/react/index.d.ts',
          );
          /* -------------------------------------------------------------------------- */
          /*                                ADD DTS LIBS                                */
          /* -------------------------------------------------------------------------- */
          for (const lib of dtsLibs) {
            const libUri = stringToUri(lib.filePath);
            const extension = lib.filePath.split('.').pop();
            switch (extension) {
              case 'ts':
              case 'tsx': {
                if (!monaco.editor.getModel(libUri)) {
                  monaco.languages.typescript.typescriptDefaults.addExtraLib(
                    lib.content,
                    lib.filePath,
                  );
                }
                break;
              }
              default:
                break;
            }
          }

          /* -------------------------------------------------------------------------- */
          /*                              SETUP TYPESCRIPT                              */
          /* -------------------------------------------------------------------------- */

          /** Use prettier to format the code on command + s */
          monaco.languages.registerDocumentFormattingEditProvider(
            'typescript',
            PrettierFormatProvider,
          );

          /** TODO: see what's in default compiler options and add only what's necessary */
          monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
            jsxImportSource: 'katcn',
            allowNonTsExtensions: true,
            strict: true,
            target: monaco.languages.typescript.ScriptTarget.ESNext,
            strictNullChecks: true,
            moduleResolution:
              monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            allowSyntheticDefaultImports: true,
            jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
            resolvePackageJsonExports: true,
            noEmit: true,
          });

          /** TODO: see what's in default diagnostic options add only what's necessary */
          monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            ...monaco.languages.typescript.typescriptDefaults.getDiagnosticsOptions(),
            noSemanticValidation: false,
            noSuggestionDiagnostics: false,
            noSyntaxValidation: false,
          });

          /**
           * TS suggestions in monaco don't not the use same trigger characters as VSCode
           * Originally reported here https://github.com/microsoft/monaco-editor/discussions/3711
           * Monaco trigger characters https://github.com/microsoft/monaco-editor/blob/main/src/language/typescript/languageFeatures.ts#L436
           * VScode trigger characters https://github.com/microsoft/vscode/blob/main/extensions/typescript-language-features/src/languageFeatures/completions.ts#L668
           */

          const { SuggestAdapter } = await import(
            'monaco-editor/esm/vs/language/typescript/tsMode'
          );

          class MySuggestAdapter
            extends SuggestAdapter
            implements monacoType.languages.CompletionItemProvider
          {
            // @ts-expect-error this is fine
            public get triggerCharacters() {
              // VSCode's triggers has `" "` but its pretty noisy, so we removed that.
              // Could probably add back, but make sure to filter out values when about to add attribute and vice versa.
              return ['.', '"', "'", '`', '/', '@', '<', '""'];
            }

            // TODO: filter out dupes in suggestions
          }

          const getTsWorker =
            await monaco.languages.typescript.getTypeScriptWorker();
          const suggestionAdapter = new MySuggestAdapter(getTsWorker);
          monaco.languages.registerCompletionItemProvider(
            'typescript',
            suggestionAdapter,
          );

          /* -------------------------------------------------------------------------- */
          /*                                 UPDATE REFS                                */
          /* -------------------------------------------------------------------------- */
          const tsworker = await getTsWorker();
          onMount?.({ editor, monaco, tsworker });
          refs.current.editor = editor;
          refs.current.monaco = monaco;
          refs.current.tsworker = tsworker;
        }}
        onChange={onChange}
      />
    </VStack>
  );
}
