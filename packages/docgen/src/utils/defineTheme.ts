// ported from: https://github.com/codesandbox/codesandbox-client/blob/master/packages/app/src/embed/components/Content/Monaco/define-theme.js
import { colord } from 'colord';
import type * as monacoType from 'monaco-editor';

const sanitizeColor = (color: string) => {
  if (!color) {
    return color;
  }

  if (/#......$/.test(color) || /#........$/.test(color)) {
    return color;
  }

  try {
    return colord(color).toHex();
  } catch (e) {
    return '#FF0000';
  }
};

const colorsAllowed = ({
  foreground,
  background,
}: { foreground: string; background: string }) => {
  if (foreground === 'inherit' || background === 'inherit') {
    return false;
  }

  return true;
};

export interface Theme {
  type: string;
  colors: Record<string, string>;
  tokenColors: {
    name: string;
    scope: string | string[];
    settings: TokenRule;
  }[];
}

interface TokenRule {
  token?: string;
  foreground: string;
  background: string;
  fontStyle: string;
}

export const getTheme = (theme: Theme) => {
  const { tokenColors = [], colors = {} } = theme;
  const rules = tokenColors
    .filter((t) => t.settings && t.scope && colorsAllowed(t.settings))
    .reduce((acc, token) => {
      const settings = {
        foreground: sanitizeColor(token.settings.foreground),
        background: sanitizeColor(token.settings.background),
        fontStyle: token.settings.fontStyle,
      };

      const scope =
        typeof token.scope === 'string'
          ? token.scope.split(',').map((a) => a.trim())
          : token.scope;

      scope.map((s) =>
        acc.push({
          token: s,
          ...settings,
        }),
      );

      return acc;
    }, [] as monacoType.editor.ITokenThemeRule[]);

  const newColors = colors;

  for (const color in colors) {
    if (newColors[color]) continue;
    delete newColors[color];
  }

  return {
    colors: newColors,
    rules,
    type: theme.type,
  };
};

export const getFallbackTheme = (type: string) => {
  if (type === 'dark') {
    return 'vs-dark';
  }

  if (type === 'hc') {
    return 'hc-black';
  }

  return 'vs';
};

export const defineTheme = (monaco: typeof monacoType, theme: Theme) => {
  if (theme && monaco.editor.defineTheme) {
    const transformedTheme = getTheme(theme);

    try {
      monaco.editor.defineTheme('CodeSandbox', {
        base: getFallbackTheme(transformedTheme.type),
        inherit: true,
        colors: transformedTheme.colors,
        rules: transformedTheme.rules,
      });

      monaco.editor.setTheme('CodeSandbox');
    } catch (e) {
      console.error(e);
    }
  }
};
