import fs from 'node:fs';
import os from 'node:os';

import { EasJsonAccessor, EasJsonUtils, Platform } from '@expo/eas-json';
import { type Props, print } from 'bluebun';
import { $, semver, which } from 'bun';

export interface MobileProps extends Props {
  options: {
    profile: string;
    platform: Platform;
    jsEngine?: 'hermes' | 'jsc';
    debug?: boolean;
  };
}

export async function needsBinary(lib: string) {
  return which(lib) === null;
}

export async function needsBrewFormula(formula: string) {
  return (
    (await $`brew list --formula | grep ${formula} | wc -l`.text()).trim() ===
    '0'
  );
}

export async function setup({
  props,
  env: envOpts,
}: {
  props: MobileProps;
  env?: Partial<typeof Bun.env>;
}) {
  const {
    profile,
    platform,
    jsEngine = 'hermes',
    debug = false,
  } = props.options;
  const isIOS = platform === Platform.IOS;
  const isAndroid = platform === Platform.ANDROID;
  const pathAsString = await $`echo $PATH`.text();
  const needsBunInPath = !pathAsString.includes('.bun');

  /* -------------------------------------------------------------------------- */
  /*                            VERIFY BUN IS IN PATH                           */
  /* -------------------------------------------------------------------------- */
  if (needsBunInPath) {
    /**
     * If BUN_INSTALL is not in the path, we need to add it.
     * https://bun.sh/docs/installation#checking-installation:~:text=shell%27s%20configuration%20file.
     */
    console.write(
      'BUN is not installed globally or is not available in your $PATH. Adding to your $PATH...',
    );
    const whichShell = await $`echo $SHELL`.text();
    const homeDirectory = os.homedir();
    const shellRcFile = whichShell.includes('zsh') ? '.zshrc' : '.bashrc';
    fs.appendFileSync(
      `${homeDirectory}/${shellRcFile}`,
      '\n# bun\nexport BUN_INSTALL="$HOME/.bun"\nexport PATH="$BUN_INSTALL/bin:$PATH"',
    );
    await $`source $HOME/${shellRcFile}`;
  }

  /* -------------------------------------------------------------------------- */
  /*                                 XCODE SETUP                                */
  /* -------------------------------------------------------------------------- */
  if (isIOS) {
    const xcodePath = await $`xcode-select -p`.text();

    if (xcodePath) {
      const isInvalidXcodePath = !xcodePath.startsWith('/Applications');

      if (isInvalidXcodePath) {
        console.write(`
        /* -------------------------------------------------------------------------- */
        /*                           XCODDE PATH IS INVALID                           */
        /* -------------------------------------------------------------------------- */

        Run the following command to set the correct path to XCode:

        sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
        `);
        throw new Error('XCode path invalid');
      }
    } else {
      console.write(`
        /* -------------------------------------------------------------------------- */
        /*                             XCODE NOT INSTALLED                            */
        /* -------------------------------------------------------------------------- */

        You must have XCode installed before continuing...

        Visit https://apps.apple.com/us/app/xcode/id497799835?mt=12 to download.
      `);
      throw new Error('XCode not installed');
    }

    /**
     * Installing the XCode command line tools & simulators normally
     * requires opening up XCode to install.
     * This conditional is to avoid having to do that.
     *
     * If xcode command line tools and simulators have already been installed, that's
     * fine. This command is really fast and will continue running if already available.
     *
     * https://developer.apple.com/documentation/xcode/installing-additional-simulator-runtimes#Install-and-manage-Simulator-runtimes-from-the-command-line
     */
    await $`xcodebuild -runFirstLaunch`;
    await $`xcodebuild -downloadPlatform iOS`;
  }

  /* -------------------------------------------------------------------------- */
  /*                            JAVA DEVELOPMENT KIT                            */
  /* -------------------------------------------------------------------------- */
  if (isAndroid) {
    const jdkPath = await $`brew info --cask zulu17`.text();
    const needsJdk = jdkPath.includes('unavailable');
    if (needsJdk) {
      console.write('Installing Java Development Kit for Android...');
      await $`brew install --cask zulu17`;
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                              EAS CONFIG SETUP                              */
  /* -------------------------------------------------------------------------- */
  /**
   * eas.json is used to define build profiles for different environments.
   * For example, you may have a profile for development, staging, and production.
   *
   * The EAS CLI is used to build and run an app locally based on the eas.json,
   * but it isn't opinionated about how you define your profiles.
   *
   * We however want to enforce some conventions to make it easier to get started.
   * We also want to store our builds outside of EAS ecosystem since they auto
   * delete after 30 days & our builds infrequently.
   *
   */
  const appDirectory = Bun.env.PWD;
  const easJsonAccessor = EasJsonAccessor.fromProjectPath(appDirectory);
  const easProfiles =
    await EasJsonUtils.getBuildProfileNamesAsync(easJsonAccessor);

  if (!easProfiles.includes(profile)) {
    const profileNames = easProfiles.join(', ');
    const suggestion = `Please add one or use ${profileNames}.`;

    if (!profile) {
      print(`No profile name was provided. ${suggestion}`);
    } else {
      print(
        `A profile with name ${profile} does not exist as a key in eas.json > build object.\n${suggestion}`,
      );
    }
    process.exit(0);
  }

  const easJsonConfig = await EasJsonUtils.getBuildProfileAsync(
    easJsonAccessor,
    platform,
    profile,
  );
  const easCliConfig = await EasJsonUtils.getCliConfigAsync(easJsonAccessor);
  const easCliVersion = easCliConfig?.version ?? 'latest';

  /* -------------------------------------------------------------------------- */
  /*                                EAS CLI SETUP                               */
  /* -------------------------------------------------------------------------- */
  /**
   * EAS CLI is used to build and run an app locally.
   */
  const needsEasCli = await needsBinary('eas');
  if (needsEasCli) {
    await $`bun install eas-cli@${easCliVersion} -g`.quiet();
  } else {
    const currentEasCliVersion = await $`eas --version`.text();
    if (!semver.satisfies(currentEasCliVersion, easCliVersion)) {
      await $`bun install eas-cli@${easCliVersion} -g`.quiet();
    }
  }

  const {
    APP_BUNDLE_IDENTIFIER,
    APP_ANDROID_BUNDLE_IDENTIFIER: androidId = APP_BUNDLE_IDENTIFIER as string,
    APP_APPLE_BUNDLE_IDENTIFIER: appleId = APP_BUNDLE_IDENTIFIER as string,
  } = easJsonConfig.env ?? {};

  // TODO: Add additional checks for ensuring this value adheres to Android formatting specs
  if (isAndroid && !androidId) {
    throw new Error(`
      APP_ANDROID_BUNDLE_IDENTIFIER must be defined in eas.json within the ${profile} > env config.
      See https://docs.expo.dev/build-reference/variables/#setting-plaintext-environment-variables-in-easjson for information about env variables in eas.json

      This env variable is used to populate the package key in your app.config.(js|ts) > android
      The format of this env variable must use DNS notation unique name for your app, which is a valid  Android Application ID.

      For example you could use, com.company.app, where com.company is our domain and app is our app.

      We recommend having the release build use the simplest identifier such as com.company.app and your debug variants
      adding additional context such as com.company.app_debug. When publishing, the release identifier must be unique on the Play Store.

      The name may only contain lowercase and uppercase letters (a-z, A-Z), numbers (0-9) and underscores (_),
      separated by periods (.). Each component of the name should start with a lowercase letter.

      These formatting rules only applies to Android. iOS has different requirements.

      See https://docs.expo.dev/versions/latest/config/app/#package for more details on formatting.
      See https://docs.expo.dev/build-reference/variants/ for information about build variants.
      `);
  }

  // TODO: Add additional checks for ensuring this value adheres to Uniform Type Identifier
  if (isIOS && !appleId) {
    throw new Error(`
      APP_APPLE_BUNDLE_IDENTIFIER must be defined in eas.json within the ${profile} > env config.
      See https://docs.expo.dev/build-reference/variables/#setting-plaintext-environment-variables-in-easjson for information about env variables in eas.json

      This env variable is used to populate the package key in your app.config.(js|ts) > ios
      The format of this env variable must use DNS notation unique name for your app, which is a valid Android Application ID.

      For example you could use, com.company.app, where com.company is our domain and app is our app.

      We recommend having the release build use the simplest identifier such as com.company.app and your debug variants
      adding additional context such as com.company.app-debug. When publishing, the release identifier must be unique to the App Store.

      The string format should be Uniform Type Identifier(UTI), which is alphanumeric characters (A-Z,a-z,0-9), hyphen (-), and period (.)

      These formatting rules only applies to iOS. Android has different requirements.

      See https://docs.expo.dev/versions/latest/config/app/#bundleidentifier for more details on formatting.
      See https://docs.expo.dev/build-reference/variants/ for information about build variants.
      `);
  }

  const outputName = `${platform}-${profile}-${jsEngine}`;
  const prebuildsDir = `${appDirectory}/prebuilds`; // TODO: make this configurable
  const outputDir = `${prebuildsDir}/${outputName}`;
  const outputFileBase = `${outputDir}/${outputName}`;

  /* -------------------------------------------------------------------------- */
  /*                            ENVIRONMENT VARIABLES                           */
  /* -------------------------------------------------------------------------- */
  let envVars = Bun.env;

  envVars = {
    ...envVars,
    APP_ANDROID_BUNDLE_IDENTIFIER: androidId,
    APP_APPLE_BUNDLE_IDENTIFIER: appleId,
    RCT_NO_LAUNCH_PACKAGER: '1',
    EXPO_NO_TELEMETRY: '1',
    EXPO_NO_WEB_SETUP: '1',
  };

  if (debug) {
    envVars = {
      ...envVars,
      DEBUG: '*',
      EAS_LOCAL_BUILD_SKIP_CLEANUP: '1',
      EXPO_PROFILE: '1',
    };
  }

  if (envOpts) {
    envVars = { ...envVars, ...envOpts };
  }

  /** Change the default environment variables for shells created by this instance. */
  $.env(envVars);

  const output = {
    name: outputName,
    dir: outputDir,
    prebuildsDir,
    fileBase: outputFileBase,
    artifact: isIOS ? `${outputFileBase}.tar.gz` : `${outputFileBase}.zip`,
    app: isIOS ? `${outputFileBase}.app` : 'todo fix android',
    get launchFile() {
      return isIOS ? this.artifact : this.apk.signed;
    },
    apk: {
      contents: `${outputFileBase}/build`,
      rebuilt: `${outputFileBase}/binary-rebuilt.apk`,
      rebuiltAligned: `${outputFileBase}/binary-rebuilt-aligned.apk`,
      signed: `${outputFileBase}/binary.apk`,
      test: `${outputFileBase}/testBinary.apk`,
    },
  };

  return {
    scheme: isIOS ? appleId : androidId,
    channel: easJsonConfig.channel,
    debug,
    profile,
    platform,
    jsEngine,
    appDirectory,
    output,
  };
}
