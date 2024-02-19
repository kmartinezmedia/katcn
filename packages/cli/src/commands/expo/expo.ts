import { getCommandHelp } from '../../utils/getCommandHelp';
import { type MobileProps } from './_setup';

export default {
  name: 'expo',
  description: '',
  run: async (props: MobileProps) => {
    switch (props?.first) {
      case 'build':
        return (await import('./build')).default.run(props);
      case 'dev':
        return (await import('./dev')).default.run(props);
      case 'launch':
        return (await import('./launch')).default.run(props);
      case 'update':
        return (await import('./update')).default.run(props);
      default: {
        await getCommandHelp(props);
        break;
      }
    }
  },
};
