import { cssEscape, entries, flattenObj } from '../../helpers';
import type { UniversalTokensConfig } from '../../types';
import { CSS_VAR_PREFIX } from './consts';
import { createPreflight } from './createPreflight';
import { createTheme } from './createTheme';

import {
  type CustomAtRules,
  Features,
  type Visitor,
  composeVisitors,
  transform,
} from 'lightningcss';
import { getClassnameDeclarations } from './utils';
import { defaultTokensConfig } from '../../tokens';

const decoder = new TextDecoder();

export interface KatcnStyleSheetOpts {
  disablePreflight: boolean;
  config: UniversalTokensConfig;
}

export class KatcnStyleSheet {
  public config: UniversalTokensConfig;
  public safelist = new Map<string, Set<string>>();
  public varsSafelist = new Set<string>();

  constructor(public opts?: KatcnStyleSheetOpts) {
    this.config = opts?.config ?? defaultTokensConfig;
  }

  public get classnames() {
    const allClassNames = new Set<string>();
    for (const classNames of this.safelist.values()) {
      for (const className of classNames) {
        const splitClassName = className.trimStart().trimEnd().split(' ');
        for (const sClassName of splitClassName) {
          allClassNames.add(sClassName);
        }
      }
    }
    return allClassNames;
  }

  get base() {
    const styles: string[] = [];

    if (!this.opts?.disablePreflight) {
      const preflight = createPreflight();
      styles.push(preflight);
    }

    if (styles.length > 0) {
      const content = styles.join('\n');
      return `@layer base { ${content} }`;
    }
    return '';
  }

  get theme() {
    const vars: string[] = [];
    const flattenedObj = flattenObj(createTheme(this.config));
    for (const [property, value] of entries(flattenedObj)) {
      const escapedVar = cssEscape(property);
      vars.push(`--${CSS_VAR_PREFIX}-${escapedVar}: ${value};`);
    }
    if (vars.length > 0) {
      const content = vars.join('\n');
      return `
        @layer theme {
          :where(html) { ${content} }
        }
      `;
    }
    return '';
  }

  get utilities() {
    const utilities = getClassnameDeclarations(this.classnames, this.config);
    if (utilities.length > 0) {
      const content = utilities.join('\n');
      return `@layer utilities { ${content} }`;
    }
    return '';
  }

  get cssTemplate() {
    return [this.base, this.theme, this.utilities].filter(Boolean).join('\n');
  }

  get ruleVisitor() {
    const allClassNamesToKeep = this.classnames;
    const varsToKeep = this.varsSafelist;

    return {
      Rule(rule) {
        if (rule.type === 'style') {
          // Filter selectors (i.e. classnames) and keep only the ones in the safelist
          for (const selector of rule.value.selectors) {
            for (const sel of selector) {
              if (sel.type === 'attribute') {
                return rule;
              }

              if (sel.type === 'class') {
                if (allClassNamesToKeep?.has(sel.name)) {
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
  }

  get declarationVisitor() {
    const varsSafelist = this.varsSafelist;
    return {
      Declaration(decl) {
        if (decl.property === 'custom') {
          const declarationName = decl.value.name;
          const declarationValue = decl.value.value;

          if (varsSafelist.has(declarationName)) {
            for (const val of declarationValue) {
              if (val.type === 'function' && val.value.name === 'oklch') {
                for (const varInOklch of val.value.arguments) {
                  if (varInOklch.type === 'var') {
                    const varName = varInOklch.value.name.ident;
                    varsSafelist.add(varName);
                  }
                }
              }
              if (val.type === 'var') {
                const parentVarName = val.value.name.ident;
                varsSafelist.add(parentVarName);
              }
            }
            return decl;
          }

          return [];
        }
      },
    } satisfies Visitor<CustomAtRules>;
  }

  get css() {
    /** Lightning css to purge final stylesheet */
    // use safelist to keep classes only the used classnames
    transform({
      filename: 'pass1.css',
      code: Buffer.from(this.cssTemplate),
      minify: true,
      visitor: this.ruleVisitor,
    });

    transform({
      filename: 'pass2.css',
      code: Buffer.from(this.cssTemplate),
      minify: true,
      visitor: this.declarationVisitor,
    });

    transform({
      filename: 'pass3.css',
      code: Buffer.from(this.cssTemplate),
      minify: true,
      visitor: this.declarationVisitor,
    });

    const transformedCss = transform({
      filename: 'style.css',
      code: Buffer.from(this.cssTemplate),
      minify: true,
      include: Features.OklabColors | Features.LogicalProperties,
      visitor: composeVisitors([this.ruleVisitor, this.declarationVisitor]),
    });

    return decoder.decode(transformedCss.code);
  }
}
