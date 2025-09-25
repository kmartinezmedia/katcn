'use client';

import { Editor as MonacoEditor } from '@monaco-editor/react';
import { VStack } from 'katcn';
import dtsLibs from 'katcn/dtsLibs.json';
import type * as monacoType from 'monaco-editor';
import { useContext, useEffect, useRef } from 'react';
import { PrettierFormatProvider } from '@/lib/prettier';
import { PlaygroundContext } from '../_playground-context';

interface CodeEditorRefs {
  monaco?: MonacoInstance;
  editor?: EditorInstance;
  tsworker?: TypescriptWorker;
}
type MonacoInstance = typeof monacoType;
type EditorInstance = monacoType.editor.IStandaloneCodeEditor;
type TypescriptWorker = monacoType.languages.typescript.TypeScriptWorker;
type OnMount = (params: Required<CodeEditorRefs>) => void;
type OnChange = (
  value: string | undefined,
  ev: monacoType.editor.IModelContentChangedEvent,
) => void | Promise<void>;

export default function Editor() {
  const { jsInput, setJsInput } = useContext(PlaygroundContext);
  const refs = useRef<CodeEditorRefs>({
    monaco: undefined,
    editor: undefined,
    tsworker: undefined,
  });

  const onMount: OnMount = async ({ editor, monaco, tsworker }) => {
    refs.current.editor = editor;
    refs.current.monaco = monaco;
    refs.current.tsworker = tsworker;
  };

  const onChange: OnChange = (value) => {
    if (refs.current.monaco) {
      const stringToUri = refs.current.monaco.Uri.parse;
      const markers = refs.current.monaco?.editor
        ?.getModelMarkers({
          owner: 'typescript',
          resource: stringToUri('user.tsx'),
        })
        .filter(
          (marker) =>
            marker.message !==
            "'Example' is declared but its value is never read.",
        );

      console.log('markers', markers);
      console.log('value', value);

      if (markers?.length === 0) {
        console.log('errors', markers);
        if (value === undefined) return;
        setJsInput(value);
      }
    }
  };

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
    <VStack height="screen" width="full">
      <MonacoEditor
        defaultLanguage="typescript"
        language="typescript"
        theme="vs-dark"
        className="overflow-hidden"
        height="100%"
        width="1/2"
        defaultValue={jsInput}
        value={jsInput}
        defaultPath="user.tsx"
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
          // const reactTypesResp = await fetch(
          //   'https://unpkg.com/@types/react@18.2.0/index.d.ts',
          // );
          // const reactTypes = await reactTypesResp.text();
          // monaco.languages.typescript.typescriptDefaults.addExtraLib(
          //   reactTypes,
          //   'file:///node_modules/react/index.d.ts',
          // );
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
            jsxImportSource: 'react',
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
