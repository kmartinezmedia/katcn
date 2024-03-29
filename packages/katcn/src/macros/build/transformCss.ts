import {
  type CustomAtRules,
  type Visitor,
  composeVisitors,
  transform,
} from 'lightningcss';
import type { UniversalTokensConfig } from '../../types';
import { KatcnStyleSheet, type KatcnStyleSheetOpts } from '../css/stylesheet';

interface TransformCssOptions extends KatcnStyleSheetOpts {
  config?: UniversalTokensConfig;
  classNamesToKeep?: Set<string>;
  varsToKeep?: Set<string>;
}

const decoder = new TextDecoder();

export function transformCss({
  config,
  classNamesToKeep = new Set<string>(),
  varsToKeep = new Set<string>(),
  includePreflight = true,
}: TransformCssOptions) {
  const stylesheet = new KatcnStyleSheet({ includePreflight, config });
  const cssContent = stylesheet.css;

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

  const declarationVisitor = {
    Declaration(decl) {
      if (decl.property === 'custom') {
        const declarationName = decl.value.name;
        const declarationValue = decl.value.value;
        if (varsToKeep.has(declarationName)) {
          for (const val of declarationValue) {
            if (val.type === 'function' && val.value.name === 'oklch') {
              for (const varInOklch of val.value.arguments) {
                if (varInOklch.type === 'var') {
                  const varName = varInOklch.value.name.ident;
                  varsToKeep.add(varName);
                }
              }
            }
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
    visitor: declarationVisitor,
  });

  const transformedCss = transform({
    filename: 'style.css',
    code: cssBuffer,
    minify: true,
    visitor: composeVisitors([ruleVisitor, declarationVisitor]),
  });

  const finalCss = decoder.decode(transformedCss.code);

  return finalCss;
}
