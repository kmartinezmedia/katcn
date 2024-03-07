import { createTailwindConfig } from 'katcn/tailwind';

const classNames = '';
export default createTailwindConfig({
  content: [
    {
      raw: `<div class="${classNames}">`,
      extension: 'html',
    },
  ],
});
