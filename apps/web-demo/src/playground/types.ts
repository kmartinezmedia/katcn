export type PlaygroundTabID =
  | 'css'
  | 'js'
  | 'preview'
  | 'css-safelist'
  | 'css-tailwind';

export type Playground = {
  id: string;
  jsInput: string;
  cssInput: string;
  cssOutput: string;
  cssSafelist: string;
  jsOutput: string;
};
