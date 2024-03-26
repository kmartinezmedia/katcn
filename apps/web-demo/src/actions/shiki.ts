'use server';

import { type BuiltinLanguage, codeToHtml } from 'shiki';

export default async function shiki({
  code,
  lang,
}: { id: string; code: string; lang: BuiltinLanguage }) {
  return codeToHtml(code, { lang, theme: 'dracula' });
}
