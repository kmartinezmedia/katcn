import { $, semver } from 'bun';

import {
  type MobileProps,
  needsBinary,
  needsBrewFormula,
  setup,
} from './_setup';

export default {
  name: 'build',
  description: '🚀 Build',
  run: async (props: MobileProps) => {
    const { platform, profile, output } = await setup({
      props,
    });

    /* ----- Homebrew, Fastlane, and Cocoapods are only required for builds. ---- */
    /* -------------------------------------------------------------------------- */
    /*                               HOMEBREW SETUP                               */
    /* -------------------------------------------------------------------------- */
    const needsBrew = await needsBinary('brew');
    if (needsBrew) {
      console.write('Installing brew...');
      await $`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`;
      console.write('Installing brew...Complete');

      /**
       * This logic was ported from the homebrew installer script
       * https://github.com/Homebrew/install/blob/master/install.sh#L153C5-L153C63.
       * However, their script just alerts users to the fact that they need to add
       * brew to their path, but doesn't do it for them. This logic attempts to do that
       * so we can automatically proceed to the next steps of auto-installing
       * the necessary dependencies for local development.
       */
      const machineArch = await $`uname -m`.text();
      const isLinux = (await $`uname`.text()) === 'Linux';
      const shellType = await $`echo $SHELL`.text();
      const homebrewPrefix = machineArch.includes('arm64')
        ? '/opt/homebrew'
        : '/usr/local';
      let shellRcFile: string;

      if (isLinux) {
        shellRcFile = shellType.includes('zsh') ? '.zshrc' : '.bashrc';
      } else {
        shellRcFile = shellType.includes('zsh') ? '.zprofile' : '.bash_profile';
      }

      const shellRcPath = `${Bun.env.HOME}/${shellRcFile}`;
      let shellRcContents = '';
      try {
        shellRcContents = await Bun.file(shellRcPath).text();
      } catch (_err) {
        // Ignore if it doesn't exist. We create it below.
      }

      if (!shellRcContents.includes('homebrew')) {
        console.write('Adding brew to $PATH...');
        const newShellRcContents = `${shellRcContents}\neval "$(${homebrewPrefix}/bin/brew shellenv)"`;
        await Bun.write(shellRcPath, newShellRcContents);
      }
    }

    /* -------------------------------------------------------------------------- */
    /*                               FASTLANE SETUP                               */
    /* -------------------------------------------------------------------------- */
    const needsFastlane = await needsBrewFormula('fastlane');
    if (needsFastlane) {
      console.write('Installing fastlane...');
      await $`brew install fastlane`;
    }

    /* -------------------------------------------------------------------------- */
    /*                               COCOAPODS SETUP                              */
    /* -------------------------------------------------------------------------- */
    const needsCocoapods = await needsBrewFormula('cocoapods');
    /** https://github.com/facebook/react-native/issues/42698#issuecomment-1915670708 */
    const validCocoapodsVersion = '>1.15.2';

    if (needsCocoapods) {
      console.write('Installing cocoapods...');
      await $`brew install cocoapods`;
    } else {
      const cocoapodsVersion = await $`pod --version`.text();
      const needsUpgrade = semver.satisfies(
        cocoapodsVersion,
        validCocoapodsVersion,
      );
      if (needsUpgrade) {
        console.write(
          `Upgrading cocoapods from ${cocoapodsVersion} to ${validCocoapodsVersion}...`,
        );
        await $`brew upgrade cocoapods`;
      }
    }

    await $`eas build --local --non-interactive --json --clear-cache --platform ${platform} --profile ${profile} --output ${output.artifact}`;
    console.write('You can now run your dev command to start the app!');
  },
};
