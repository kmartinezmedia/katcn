'use server';

import { codeToHtml, type BuiltinLanguage } from 'shiki';

export default async function shiki({
  code,
  lang,
}: { id: string; code: string; lang: BuiltinLanguage }) {
  return codeToHtml(code, { lang, theme: 'dracula' });
}
