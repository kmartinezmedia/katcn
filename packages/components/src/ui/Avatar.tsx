import { UniversalAvatarProps } from '../types/props';
import { HtmlImgProps, Image } from './Image';

interface AvatarProps extends HtmlImgProps, UniversalAvatarProps {}

function Avatar(props: AvatarProps) {
  return <Image {...props} />;
}

Avatar.displayName = 'Avatar';

export { Avatar, type AvatarProps };
