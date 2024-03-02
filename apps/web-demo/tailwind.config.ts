import { createTailwindConfig } from 'katcn/tailwind/createTailwindConfig';

export default createTailwindConfig({
  content: [
    './src/pages/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx,mdx}',
    './src/app/**/*.{ts,tsx,mdx}',
  ],
});
