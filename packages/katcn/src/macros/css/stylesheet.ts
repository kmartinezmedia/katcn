import { cssEscape, entries, flattenObj } from '../../helpers';
import { defaultTokensConfig } from '../../tokens';
import type { ColorMode, ScaleMode, UniversalTokensConfig } from '../../types';
import { CSS_VAR_PREFIX } from './consts';
import { createBase } from './createBase';
import { createPreflight } from './createPreflight';
import { createTheme } from './createTheme';
import { createUtilities } from './createUtilities';

type StyleMap = Record<string, string | Record<string, string>>;
export interface KatcnStyleSheetOpts {
  includePreflight?: boolean;
  config?: UniversalTokensConfig;
  scaleMode?: ScaleMode[] | 'all';
  colorMode?: ColorMode[] | 'all';
}

function processLayer(layer: Set<string>) {
  return Array.from(layer).join('\n');
}

export class KatcnStyleSheet {
  public base = new Set<string>();
  public theme = {
    colorMode: {
      light: this.base,
      dark: new Set<string>(),
    },
    scaleMode: {
      xSmall: new Set<string>(),
      small: new Set<string>(),
      medium: new Set<string>(),
      large: this.base,
      xLarge: new Set<string>(),
      xxLarge: new Set<string>(),
      xxxLarge: new Set<string>(),
    },
  };
  public utilities = new Set<string>();
  config: UniversalTokensConfig = defaultTokensConfig;

  constructor(public opts: KatcnStyleSheetOpts) {
    if (opts.config) {
      this.config = opts.config;
    }

    if (opts?.includePreflight) {
      this.base.add(createPreflight());
    }

    const baseVars = createBase(this.config);
    const addBaseVars = this.addVarsToLayer(this.base);
    addBaseVars(flattenObj(baseVars));

    switch (opts.scaleMode) {
      case 'all':
        this.addScaleMode('xSmall');
        this.addScaleMode('small');
        this.addScaleMode('medium');
        this.addScaleMode('xLarge');
        this.addScaleMode('xxLarge');
        this.addScaleMode('xxxLarge');
        break;
      default:
        for (const scaleMode of opts.scaleMode ?? []) {
          this.addScaleMode(scaleMode);
        }
    }

    switch (opts.colorMode) {
      case 'all':
        this.addColorMode('dark');
        break;
      default: {
        for (const colorMode of opts.colorMode ?? []) {
          this.addColorMode(colorMode);
        }
      }
    }

    const addUtilClasses = this.addClassesToLayer(this.utilities);
    const utilsObj = flattenObj(createUtilities());
    addUtilClasses(utilsObj);
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

  hasColorMode(mode: ColorMode) {
    return this.opts.colorMode === 'all' || this.opts.colorMode?.includes(mode);
  }

  hasScaleMode(mode: ScaleMode) {
    return this.opts.scaleMode === 'all' || this.opts.scaleMode?.includes(mode);
  }

  addColorMode(colorMode: ColorMode) {
    const addVars = this.addVarsToLayer(this.theme.colorMode[colorMode]);
    const theme = createTheme({ colorMode, config: this.config });
    addVars(flattenObj(theme));
  }

  addScaleMode(scaleMode: ScaleMode) {
    const addVars = this.addVarsToLayer(this.theme.scaleMode[scaleMode]);
    const theme = createTheme({ scaleMode, config: this.config });
    addVars(flattenObj(theme));
  }

  get css() {
    return `
      @layer base {
        :where(html) {
          ${processLayer(this.base)}
        }
      }

      @layer theme {
        ${
          this.hasColorMode('dark')
            ? `[data-theme='dark'] {
            ${processLayer(this.theme.colorMode.dark)}
          }`
            : ''
        }
        ${
          this.hasScaleMode('xSmall')
            ? `[data-scale='xSmall'] { ${processLayer(
                this.theme.scaleMode.xSmall,
              )} }`
            : ''
        }
        ${
          this.hasScaleMode('small')
            ? `[data-scale='small'] { ${processLayer(
                this.theme.scaleMode.small,
              )} }`
            : ''
        }
        ${
          this.hasScaleMode('medium')
            ? `[data-scale='medium'] { ${processLayer(
                this.theme.scaleMode.medium,
              )} }`
            : ''
        }
        ${
          this.hasScaleMode('xLarge')
            ? `[data-scale='xLarge'] { ${processLayer(
                this.theme.scaleMode.xLarge,
              )} }`
            : ''
        }
        ${
          this.hasScaleMode('xxLarge')
            ? `[data-scale='xxLarge'] { ${processLayer(
                this.theme.scaleMode.xxLarge,
              )} }`
            : ''
        }
        ${
          this.hasScaleMode('xxxLarge')
            ? `[data-scale='xxxLarge'] { ${processLayer(
                this.theme.scaleMode.xxxLarge,
              )} }`
            : ''
        }
      }

      @layer utilities {
        ${processLayer(this.utilities)}
      }
    `;
  }
}
