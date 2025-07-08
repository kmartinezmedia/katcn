import { getHtmlAsComponentsMapAsString } from '../macros/getHtmlAsComponentsMap' with {
  type: 'macro',
};
import type { HtmlAsComponentMap } from '../macros/getHtmlAsComponentsMap';

const htmlAsComponentsMapAsString = getHtmlAsComponentsMapAsString();

export function getHtmlAsComponentsMap(): HtmlAsComponentMap {
  return JSON.parse(htmlAsComponentsMapAsString);
}
