import { fromEntries } from '../../helpers';
import type {
  BackgroundPaletteAlias,
  BorderWidth,
  CorePaletteAlias,
  ForegroundPaletteAlias,
  LinePaletteAlias,
} from '../../types';
import { typesToConstants } from '#macros/typesToConstants' with {
  type: 'macro',
};

export function createUtilities() {
  const names = {
    palette: {
      background: typesToConstants<BackgroundPaletteAlias>(
        'BackgroundPaletteAlias',
      ),
      core: typesToConstants<CorePaletteAlias>('CorePaletteAlias'),
      line: typesToConstants<LinePaletteAlias>('LinePaletteAlias'),
      foreground: typesToConstants<ForegroundPaletteAlias>(
        'ForegroundPaletteAlias',
      ),
    },
    borderWidth: typesToConstants<BorderWidth>('BorderWidth'),
  };

  const backgroundColor = {
    ...fromEntries(
      names.palette.core.map(
        (alias) =>
          [
            `bg-${alias}`,
            `{ background-color: var(--color-core-${alias}); }`,
          ] as const,
      ),
    ),
    ...fromEntries(
      names.palette.background.map(
        (alias) =>
          [
            `bg-${alias}`,
            `{ background-color: var(--color-background-${alias}); }`,
          ] as const,
      ),
    ),
  };

  const color = {
    ...fromEntries(
      names.palette.core.map(
        (alias) =>
          [`color-${alias}`, `{ color: var(--color-core-${alias}); }`] as const,
      ),
    ),
    ...fromEntries(
      names.palette.foreground.map(
        (alias) =>
          [
            `color-${alias}`,
            `{ color: var(--color-foreground-${alias}); }`,
          ] as const,
      ),
    ),
  };

  const borderColor = {
    ...fromEntries(
      names.palette.core.map(
        (alias) =>
          [
            `border-${alias}`,
            `{ border-color: var(--color-core-${alias}); }`,
          ] as const,
      ),
    ),
    ...fromEntries(
      names.palette.foreground.map(
        (alias) =>
          [
            `border-${alias}`,
            `{ border-color: var(--color-foreground-${alias}); }`,
          ] as const,
      ),
    ),
  };

  const borderWidth = fromEntries(
    names.borderWidth.map(
      (alias) =>
        [
          `border-${alias}`,
          `{ border-width: var(--border-width-${alias}); }`,
        ] as const,
    ),
  );

  return {
    backgroundColor,
    color,
    borderColor,
    borderWidth,
  };
}
