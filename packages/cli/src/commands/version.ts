import type { Props } from 'bluebun';
import { print } from 'bluebun';
import packageJson from '../../package.json';

export default {
  name: 'version',
  description: `💾 ${packageJson.version}`,
  run: async (props: Props) => {
    print(packageJson.version);
  },
};
