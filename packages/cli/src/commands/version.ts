import { print } from 'bluebun';
import packageJson from '../../package.json';

export default {
  name: 'version',
  description: `💾 ${packageJson.version}`,
  run: async () => {
    print(packageJson.version);
  },
};
