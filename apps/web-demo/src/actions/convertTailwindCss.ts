'use server';

import { $ } from 'bun';

export async function convertTailwindCss(tailwindCss: string) {
  const css = await $`echo ${tailwindCss} | tailwindcss -i -`.text();
  return css;
}
