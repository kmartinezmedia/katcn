import { type DevOrBuildProps, runDevOrBuild } from '../utils/runDevOrBuild';

interface BuildProps {
  options: DevOrBuildProps;
}

export default {
  name: 'build',
  description: '',
  run: async (props: BuildProps) => {
    await runDevOrBuild(props.options);
  },
};
