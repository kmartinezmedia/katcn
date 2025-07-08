'use server';

import prettier from 'prettier';

export default async function formatCode({
  code,
  parser,
}: {
  code: string;
  parser: prettier.Options['parser'];
}) {
  return prettier.format(code, {
    useTabs: false,
    tabWidth: 2,
    trailingComma: 'all',
    printWidth: 100,
    parser,
  });
}
