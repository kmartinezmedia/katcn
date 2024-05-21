import { type DevOrBuildProps, runDevOrBuild } from '../utils/runDevOrBuild';

interface DevProps {
  options: DevOrBuildProps;
}

export default {
  name: 'dev',
  description: '',
  run: async (props: DevProps) => {
    await runDevOrBuild({ ...props.options, watch: true });
  },
};
