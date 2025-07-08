import type { PropertySignature } from 'ts-morph';
import type { StyleProp } from '#types';

const firstLetterCapitalizedRegex = /[a-zA-Z]/; // Precompile regeximport type { StyleModifier } from '../types';

function isFirstLetterCapitalized(text: string): boolean {
  const firstAlphabeticCharacter = text.match(firstLetterCapitalizedRegex);
  return (
    firstAlphabeticCharacter !== null &&
    firstAlphabeticCharacter[0] === firstAlphabeticCharacter[0].toUpperCase()
  );
}

/**
 *
 * @param node The key:value pair of a type definition
 * Looks at each key:value pair in a type and if the property
 * has a jsdoc with a @tailwind tag, it will extract the prefix
 * and the name of the property.
 *
 * @example
 * type StyleProps = {
 *  * @tailwind bg
 *  backgroundColor?: Color;
 * }
 *
 * Will return { twPrefix: 'bg', name: 'backgroundColor' }
 */
export function getTwPrefixAndPropName(propertySignature: PropertySignature) {
  let twPrefix = '';
  const name = propertySignature.getName();
  const jsdocs = propertySignature.getJsDocs();
  const tailwindJsdoc = jsdocs
    .flatMap((doc) => doc.getTags())
    .find((item) => item.getTagName() === 'tailwind')
    ?.getText();

  if (tailwindJsdoc) {
    twPrefix = tailwindJsdoc
      .replace('@tailwind ', '')
      .replaceAll(/\s/g, '')
      .trim();

    /**
     * If the first letter of the @tailwind tag value is capitalized
     * then it's a union of multiple classNames
     *
     * i.e. @tailwind TextTransform
     */
    if (isFirstLetterCapitalized(twPrefix)) {
      twPrefix = '';
    }
  }

  return { twPrefix, name: `${name}` as StyleProp };
}
