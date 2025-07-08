import { getHtmlFixtures } from '../node/getHtmlFixtures' with {
  type: 'macro',
};

export const { htmlToComponentMap, defaultPropsForComponentMap } =
  getHtmlFixtures();
