import { cssEscape, entries, flattenObj } from '../../helpers';
import { defaultTokensConfig } from '../../tokens';
import type { ColorMode, UniversalTokensConfig } from '../../types';
import { CSS_VAR_PREFIX } from './consts';
import { createTheme } from './createTheme';
import { createPreflight } from './createPreflight';
import { createUtilities } from './createUtilities';

import {
  type CustomAtRules,
  Features,
  type Visitor,
  composeVisitors,
  transform,
} from 'lightningcss';

const decoder = new TextDecoder();

type StyleMap = Record<string, string | Record<string, string>>;

export interface KatcnStyleSheetOpts {
  disablePreflight: boolean;
  config: UniversalTokensConfig;
}

function processLayer(layer: Set<string>) {
  return Array.from(layer).join('\n');
}

function convertArbitraryDefinition(
  input: string,
): { [key: string]: string } | null {
  // Regular expression to extract the key and value
  const regex = /(\w+)-\[(\d+px)\]/;
  const match = input.match(regex);

  if (match) {
    // match[1] contains the key (e.g., "height")
    // match[2] contains the value (e.g., "200px")
    const key = match[1];
    const value = match[2];

    // Constructing the object dynamically
    const result = { [key]: value };
    return result;
  }

  return null; // Return null if no match was found
}

export class KatcnStyleSheet {
  public config: UniversalTokensConfig = defaultTokensConfig;
  public classNamesToAdd = new Map<string, Set<string>>();
  public classNamesToKeep = new Map<string, Set<string>>();
  public varsToKeep = new Set<string>();

  public base = new Set<string>();
  public theme = new Set<string>();
  public utilities = new Set<string>();

  private addThemeVars = this.addVarsToLayer(this.theme);
  private addUtilClasses = this.addClassesToLayer(this.utilities);

  constructor(public opts: KatcnStyleSheetOpts) {
    if (opts.config) {
      this.config = opts.config;
    }

    if (!opts?.disablePreflight) {
      this.base.add(createPreflight());
    }

    this.addThemeVars(flattenObj(createTheme(this.config)));
    this.addUtilClasses(this.utilClasses);
  }

  get allClassNamesToKeep() {
    const allClassNames = new Set<string>();

    for (const classNames of this.classNamesToKeep.values()) {
      for (const className of classNames) {
        const splitClassName = className.trimStart().trimEnd().split(' ');
        for (const sClassName of splitClassName) {
          allClassNames.add(sClassName);
        }
      }
    }

    return allClassNames;
  }

  get allClassNamesToAdd() {
    const allClassNames = new Set<string>();

    for (const classNames of this.classNamesToAdd.values()) {
      for (const className of classNames) {
        const splitClassName = className.trimStart().trimEnd().split(' ');
        for (const sClassName of splitClassName) {
          if (sClassName.includes('-[')) {
            allClassNames.add(sClassName);
          }
        }
      }
    }

    return allClassNames;
  }

  get utilClasses() {
    const utilsObj = flattenObj(createUtilities());
    if (this.allClassNamesToAdd.size > 0) {
      for (const className of this.allClassNamesToAdd) {
        const value = convertArbitraryDefinition(className);
        if (value) {
          let valueString = '';
          for (const [key, val] of entries(value)) {
            valueString += `${key}: ${val};`;
          }
          utilsObj[className] = `{ ${valueString} }`;
        }
      }
    }
    return utilsObj;
  }

  addVarToLayer(layer: Set<string>) {
    return (property: string, value: string) => {
      layer.add(`--${CSS_VAR_PREFIX}-${property}: ${value};`);
    };
  }

  addVarsToLayer(layer: Set<string>) {
    return (stylemap: StyleMap) => {
      const flattenedObj = flattenObj(stylemap);
      for (const [property, value] of entries(flattenedObj)) {
        const escapedVar = cssEscape(property);
        layer.add(`--${CSS_VAR_PREFIX}-${escapedVar}: ${value};`);
      }
    };
  }

  addClassesToLayer(layer: Set<string>) {
    return (stylemap: StyleMap) => {
      const flattenedObj = flattenObj(stylemap);
      for (const [classname, definition] of entries(flattenedObj)) {
        const escapedClassname = cssEscape(classname);
        layer.add(`.${escapedClassname} ${definition}`);
      }
    };
  }

  get cssTemplate() {
    return `
      @layer base {
        ${processLayer(this.base)}
      }

      @layer theme {
        :where(html) {
          ${processLayer(this.theme)}
        }
      }

      @layer utilities {
        ${processLayer(this.utilities)}
      }
    `;
  }

  get ruleVisitor() {
    const allClassNamesToKeep = this.allClassNamesToKeep;
    const allClassNamesToAdd = this.allClassNamesToAdd;
    const varsToKeep = this.varsToKeep;
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
                if (
                  allClassNamesToKeep?.has(sel.name) ||
                  allClassNamesToAdd?.has(sel.name)
                ) {
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

  declarationVisitor(varsToKeep: Set<string>) {
    return {
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
      visitor: this.declarationVisitor(this.varsToKeep),
    });

    transform({
      filename: 'pass3.css',
      code: Buffer.from(this.cssTemplate),
      minify: true,
      visitor: this.declarationVisitor(this.varsToKeep),
    });

    const transformedCss = transform({
      filename: 'style.css',
      code: Buffer.from(this.cssTemplate),
      minify: true,
      include: Features.OklabColors | Features.LogicalProperties,
      visitor: composeVisitors([
        this.ruleVisitor,
        this.declarationVisitor(this.varsToKeep),
      ]),
    });

    return decoder.decode(transformedCss.code);
  }
}
