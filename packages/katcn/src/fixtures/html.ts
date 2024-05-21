import {
  HtmlAsComponentMap,
  getHtmlAsComponentsMapAsString,
} from '../macros/getHtmlAsComponentsMap' assert { type: 'macro' };

const htmlAsComponentsMapAsString = getHtmlAsComponentsMapAsString();

export function getHtmlAsComponentsMap(): HtmlAsComponentMap {
  return JSON.parse(htmlAsComponentsMapAsString);
}
