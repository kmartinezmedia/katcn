import { type DevOrBuildProps, runDevOrBuild } from '../utils/runDevOrBuild';

interface CssProps {
  options: DevOrBuildProps;
}

export default {
  name: 'css',
  description: '',
  run: async (props: CssProps) => {
    await runDevOrBuild(props.options);
  },
};
