import { getHtmlFixtures } from '@katcn/tsmorph/getHtmlFixtures' with {
  type: 'macro',
};

export const { htmlToComponentMap, defaultPropsForComponentMap } =
  getHtmlFixtures();
