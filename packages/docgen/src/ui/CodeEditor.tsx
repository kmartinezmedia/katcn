'use client';

import {
  Editor,
  type OnChange,
  type OnMount,
  type OnValidate,
} from '@monaco-editor/react';
import { VStack } from 'katcn';
import type * as monacoType from 'monaco-editor';
import { useCallback, useEffect, useRef } from 'react';
import ts from 'typescript';
import { PrettierFormatProvider } from '../utils/prettier';

export const USER_CODE_PATH = 'file:///user.tsx';

export type MonacoInstance = typeof monacoType;
export type EditorInstance = monacoType.editor.IStandaloneCodeEditor;
export type DtsLib = { content: string; filePath: string };
export type DtsLibs = DtsLib[];
export type UserModel = monacoType.editor.ITextModel;
export type TypescriptWorker = monacoType.languages.typescript.TypeScriptWorker;
export type TypeError = monacoType.editor.IMarkerData;

export interface CodeEditorProps {
  /** the classes applied to the container div */
  className?: string;
  userCode: string;
  dtsLibs?: DtsLibs;
  tsconfig?: monacoType.languages.typescript.CompilerOptions;
  monaco?: MonacoInstance;
  editor?: EditorInstance;
  onValidate?: OnValidate;
  onMount?: OnMount;
  onChange?: OnChange;
}

export function CodeEditor({
  onChange,
  onMount,
  onValidate,
  userCode,
  dtsLibs = [],
}: CodeEditorProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const monacoInstance = useRef<MonacoInstance | null>(null);
  const editorInstance = useRef<EditorInstance | null>(null);
  const userModel = useRef<UserModel | null>(null);
  const tsWorker = useRef<TypescriptWorker | null>(null);

  useEffect(() => {
    const saveHandler = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.code === 'KeyS' &&
        wrapper.current &&
        wrapper.current.contains(document.activeElement)
      ) {
        e.preventDefault();
        editorInstance.current
          ?.getAction('editor.action.formatDocument')
          ?.run();

        // TODO: show toast that changes were saved
      }
    };

    document.addEventListener('keydown', saveHandler);

    return () => {
      document.removeEventListener('keydown', saveHandler);
    };
  }, []);

  const typeCheck = useCallback(async () => {
    const userModeUriString = userModel.current?.uri?.toString();
    const markers: TypeError[] = [];
    // Keep code below if we want to run typecheck on multi page editor
    // const models = monaco.editor.getModels();
    // for (const model of models) {}

    if (
      !userModel.current ||
      !tsWorker.current ||
      !monacoInstance.current ||
      !userModeUriString
    ) {
      return;
    }

    // const markers = monacoInstance.current.editor.getModelMarkers({resource: userModel.current.uri})
    const diagnostics = (
      await Promise.all([
        tsWorker.current.getSyntacticDiagnostics(userModeUriString),
        tsWorker.current.getSemanticDiagnostics(userModeUriString),
      ])
    ).reduce((a, b) => a.concat(b));
    console.log('diagnostics', diagnostics);
    for (const d of diagnostics) {
      if (d.start && d.length) {
        const start = userModel.current.getPositionAt(d.start);
        const end = userModel.current.getPositionAt(d.start + d.length);

        markers.push({
          modelVersionId: userModel.current.getVersionId(),
          severity: monacoInstance.current.MarkerSeverity.Error,
          startLineNumber: start.lineNumber,
          endLineNumber: end.lineNumber,
          startColumn: start.column,
          endColumn: end.column,
          message: ts.flattenDiagnosticMessageText(d.messageText, '\n'),
        } satisfies monacoType.editor.IMarkerData);
      }
    }

    if (markers.length > 0) {
      console.log('has errors');
      console.log('markers', markers);
      monacoInstance.current.editor.setModelMarkers(
        userModel.current,
        userModel.current.getLanguageId(),
        markers,
      );
    }
  }, []);

  return (
    <VStack height="screen" backgroundColor="accent" ref={wrapper}>
      <Editor
        defaultLanguage="typescript"
        language="typescript"
        theme="vs-dark"
        className="overflow-hidden"
        height="100%"
        defaultValue={userCode}
        value={userCode}
        defaultPath={USER_CODE_PATH}
        options={{ minimap: { enabled: false } }}
        onMount={async (editor, monaco) => {
          editorInstance.current = editor;
          monacoInstance.current = monaco;
          monaco.languages.registerDocumentFormattingEditProvider(
            'typescript',
            PrettierFormatProvider,
          );
          monaco.languages.setLanguageConfiguration('typescript', {});
          monaco?.languages.typescript.typescriptDefaults.setEagerModelSync(
            true,
          );
          monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false,
          });
          monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            // noLib: true,
            allowNonTsExtensions: true,
            strict: true,
            target: monaco.languages.typescript.ScriptTarget.ESNext,
            strictNullChecks: true,
            moduleResolution:
              monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            allowSyntheticDefaultImports: true,
            jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
            jsxImportSource: 'katcn',
            resolvePackageJsonExports: true,
            noEmit: true,
          });
          monaco.languages.typescript.typescriptDefaults.setMaximumWorkerIdleTime(
            -1,
          );
          monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: false,
          });
          // Setup typechecking
          for (const lib of dtsLibs) {
            const libUri = monaco.Uri.parse(lib.filePath);
            if (!monacoInstance.current.editor.getModel(libUri)) {
              monaco.editor.createModel(lib.content, 'typescript', libUri);
              // if (lib.filePath.includes('jsx-runtime')) {
              //   monaco.editor.createModel(lib.content, 'typescript', libUri);
              // }
              if (lib.filePath.endsWith('.d.ts')) {
                monaco.languages.typescript.typescriptDefaults.addExtraLib(
                  lib.content,
                  `ts:filename/${lib.filePath}`,
                );
              }
            }
          }
          const uri = monaco.Uri.parse(USER_CODE_PATH);
          userModel.current = monaco.editor.getModel(uri);

          if (userModel.current) {
            console.log('model exists');
            monaco.languages.typescript
              .getTypeScriptWorker()
              .then(async (getWorker) => {
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                tsWorker.current = await getWorker(userModel.current!.uri);
                console.log('worker', tsWorker.current);
                typeCheck();
              });
          } else {
            console.log('model does not exist');
            userModel.current = monaco.editor.createModel(
              userCode,
              'typescript',
              uri,
            );
          }

          onMount?.({ editor, monaco: monacoInstance.current });
        }}
        onChange={(value, changeEvent) => {
          const code = value ?? '';
          onChange?.(code, changeEvent);
          typeCheck();
          // Figure out how to transpile the code to preview and render the jsx in the browser
          // setTranspiledCode(transformSync(code).code);
          console.log('change', changeEvent);
          console.log(monacoInstance.current);
          // get last item in changeEvent.changes
          const lastChange =
            changeEvent.changes[changeEvent.changes.length - 1];
          if (userModel.current) {
            tsWorker.current
              ?.getCompletionsAtPosition(
                userModel.current.uri.toString(),
                lastChange.range.startColumn,
              )
              .then((completions) => {
                // this is showing completions for the interfaces I expect, but no data for what
                // properties are available or anything like that
                console.log('completions', completions);
              });
          }
        }}
        onValidate={(vMarkers) => {
          console.log('vMarkers', vMarkers);
          onValidate?.(vMarkers);
        }}
      />
    </VStack>
  );
}
