import { Props } from 'bluebun';
import { $, sleep } from 'bun';

import { type MobileProps, setup } from './_setup';

interface MobileStartProps extends Props {
  options: MobileProps['options'] & {
    // Clear the cache when starting dev server
    clear?: boolean;
  };
}

type SimDevice = { udid: string; name: string; state: 'Booted' | 'Shutdown' };
type SimList = {
  devices: {
    [key: string]: SimDevice[];
  };
};

export default {
  name: 'dev',
  description: '🚧 Dev',
  run: async (props: MobileStartProps) => {
    const { platform, scheme, output } = await setup({
      props,
      env: {
        EXPO_USE_METRO_WORKSPACE_ROOT: '1',
      },
    });

    const extraArgs = [];

    if (props.options.clear) {
      extraArgs.push('--clear');
    }
    const extrArgsString = extraArgs.join(' ');

    try {
      /**
       * Get list of devices.
       * If there is a booted device, open the simulator on that device.
       * If no booted device is found, open the simulator on iPhone 15 Pro Max.
       * * https://github.com/expo/orbit/blob/main/packages/eas-shared/src/run/ios/simulator.ts#L98
       *
       * TODO:
       * Should we open app on all booted devices if there are multiple open?
       * Should we prompt user to pick from one of the booted devices?
       * Should we prompt user to pick a device if there are no booted devices?
       */
      if (platform === 'ios') {
        const deviceList =
          (await $`xcrun simctl list devices available --json -e`.json()) as SimList;
        const devices = Object.values(deviceList?.devices).flatMap(
          (item) => item,
        );
        const bootedDevice = devices.find(
          (device: SimDevice) => device.state === 'Booted',
        );
        if (!bootedDevice) {
          const iphone15ProMax = devices.find(
            (device) => device.name === 'iPhone 15 Pro Max',
          );
          const iphone15Udid = iphone15ProMax?.udid;
          await $`open -a Simulator --args -CurrentDeviceUDID ${iphone15Udid}`;
        }
        const appContainerPath =
          await $`xcrun simctl get_app_container booted ${scheme} data`.text();

        if (!appContainerPath) {
          console.write('App not installed on booted device. Installing...');
          await $`eas build:run --platform ${platform} --path ${output.launchFile}`;
        }
        /**
         * In dev mode we use a debug build, which requires a metro server to serve
         * the Javascript bundle.
         *
         * To avoid the, "Could not find metro server" error screen on launch,
         * we delay the launch of the app until after the metro server has started.
         */
      }

      sleep(3000).then(async () => {
        /**
         * Launch the app on the booted device
         * https://github.com/expo/eas-cli?tab=readme-ov-file#eas-buildrun
         */
        await $`eas build:run --platform ${platform} --path ${output.launchFile}`;
      });

      console.write('Starting Metro server...');
      await $`expo start --${platform} --dev-client --localhost --scheme ${scheme} ${extrArgsString}`;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
