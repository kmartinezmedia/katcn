import type { UniversalImageProps } from '../types';

type HtmlImgProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'size' | 'color' | 'height' | 'width' | 'alt' | 'src'
>;

interface ImageProps extends HtmlImgProps, UniversalImageProps {}

function Image(props: ImageProps) {
  // biome-ignore lint/a11y/useAltText: the alt attribute is already required in typescript
  return <img {...props} />;
}

Image.displayName = 'Image';

export { Image, type ImageProps, type HtmlImgProps };
