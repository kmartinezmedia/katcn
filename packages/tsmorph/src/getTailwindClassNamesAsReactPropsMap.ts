import type { AllStyleProps } from '@katcn/types';
import { getPropertiesAndJsdocTagsForType } from './propertySignatureUtils';

export type TwAsPropsMap = Record<string, AllStyleProps>;

/**
 * Used in tooling to convert tailwind classnames to react props
 *
 * This lookup map be used in conjuction with other ts-morph tooling
 * to convert `<div className="leading-tight" />` to
 * <Text lineHeight="tight" /> which then renders as <Text className="leading-tight" />
 *
 *
 * Returns:
 *  { leading: {lineHeight: 'tight'} }
 */
export function getTailwindClassNamesAsReactPropsMap() {
  const propertiesAndJsdocData = getPropertiesAndJsdocTagsForType<
    AllStyleProps,
    'tailwind'
  >('AllStyleProps');

  const dataMap = {} as { [key in string]: Partial<AllStyleProps> };

  for (const [propName, { jsdocTags, options }] of Object.entries(
    propertiesAndJsdocData,
  )) {
    if (jsdocTags.tailwind) {
      const twPrefix = jsdocTags.tailwind.replace(':', '');

      for (const option of options) {
        if (option === 'boolean') {
        } else if (option === 'string') {
          break;
        } else {
          dataMap[`tailwind-${twPrefix}-${option}`] = { [propName]: option };
        }
      }
    }
  }

  return dataMap;
}
