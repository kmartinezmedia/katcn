import { createBase, createTheme, createUtilities, css } from '#macros';
import type { UniversalTokensConfig } from '#types';
import prettier from 'prettier';
import {
  type CustomAtRules,
  type Visitor,
  composeVisitors,
  transform,
} from 'lightningcss';

interface TransformCssOptions {
  config?: UniversalTokensConfig;
  classNamesToKeep?: Set<string>;
  varsToKeep?: Set<string>;
  scaleMode?: {
    xSmall?: boolean;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
    xLarge?: boolean;
    xxLarge?: boolean;
    xxxLarge?: boolean;
  };
  colorMode?: {
    light?: boolean;
    dark?: boolean;
  };
}

const decoder = new TextDecoder();

export async function transformCss({
  config,
  classNamesToKeep = new Set<string>(),
  varsToKeep = new Set<string>(),
}: TransformCssOptions) {
  const base = createBase(config);
  const utilities = createUtilities();
  const darkTheme = createTheme({ colorMode: 'dark', config });
  const xSmall = createTheme({ scaleMode: 'xSmall', config });
  const small = createTheme({ scaleMode: 'small', config });
  const medium = createTheme({ scaleMode: 'medium', config });
  const xLarge = createTheme({ scaleMode: 'xLarge', config });
  const xxLarge = createTheme({ scaleMode: 'xxLarge', config });
  const xxxLarge = createTheme({ scaleMode: 'xxxLarge', config });

  const cssContent = css`
    @layer base {
      :where(html) {
        ${base}
      }
    }

    @layer theme {
      [data-theme='dark'] {
        ${darkTheme}
      }
      [data-scale='xSmall'] {
        ${xSmall}
      }
      [data-scale='small'] {
        ${small}
      }
      [data-scale='medium'] {
        ${medium}
      }
      [data-scale='xLarge'] {
        ${xLarge}
      }
      [data-scale='xxLarge'] {
        ${xxLarge}
      }
      [data-scale='xxxLarge'] {
        ${xxxLarge}
      }
    }

    @layer utilities {
      ${utilities}
    }
`;

  const ruleVisitor = {
    Rule(rule) {
      if (rule.type === 'style') {
        // Filter selectors (i.e. classnames) and keep only the ones in the safelist
        for (const selector of rule.value.selectors) {
          for (const sel of selector) {
            if (sel.type === 'attribute') {
              return rule;
            }

            if (sel.type === 'class') {
              if (classNamesToKeep?.has(sel.name)) {
                for (const decl of rule.value.declarations.declarations) {
                  if (decl.property === 'unparsed') {
                    for (const val of decl.value.value) {
                      if (val.type === 'var') {
                        const varName = val.value.name.ident;
                        varsToKeep.add(varName);
                      }
                    }
                  }
                }
                return rule;
              }
              // Discard any unused classNames
              return [];
            }
          }
        }
        // Keep all other rules like @base, @theme, @utilities
        return rule;
      }
    },
  } satisfies Visitor<CustomAtRules>;

  const declarationVisitor1 = {
    Declaration(decl) {
      if (decl.property === 'custom') {
        const declarationName = decl.value.name;
        const declarationValue = decl.value.value;
        if (varsToKeep.has(declarationName)) {
          for (const val of declarationValue) {
            if (val.type === 'var') {
              const parentVarName = val.value.name.ident;
              varsToKeep.add(parentVarName);
            }
          }
          return decl;
        }

        return [];
      }
    },
  } satisfies Visitor<CustomAtRules>;

  const cssBuffer = Buffer.from(cssContent);

  /** Lightning css to purge final stylesheet */
  // use safelist to keep classes only the used classnames
  transform({
    filename: 'style.css',
    code: cssBuffer,
    minify: true,
    visitor: ruleVisitor,
  });

  transform({
    filename: 'style.css',
    code: cssBuffer,
    minify: true,
    visitor: declarationVisitor1,
  });

  const transformedCss = transform({
    filename: 'style.css',
    code: cssBuffer,
    minify: true,
    visitor: composeVisitors([ruleVisitor, declarationVisitor1]),
  });

  const finalCss = decoder.decode(transformedCss.code);
  const formattedCss = await prettier.format(finalCss, {
    parser: 'css',
  });

  console.log(formattedCss);

  return formattedCss;
}
