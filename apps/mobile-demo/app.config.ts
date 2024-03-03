import type { ExpoConfig } from '@expo/config-types';

export const expo: ExpoConfig = {
  owner: 'kmartinezmedia',
  name: 'mobile-app',
  slug: 'create-monorepo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'mobile-app',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: process.env.APP_APPLE_BUNDLE_IDENTIFIER,
    supportsTablet: true,
  },
  android: {
    package: process.env.APP_ANDROID_BUNDLE_IDENTIFIER,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  plugins: [
    [
      'expo-build-properties',
      {
        ios: {
          deploymentTarget: '13.4',
        },
      },
    ],
    'expo-router',
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/SpaceMono-Regular.ttf',
          './assets/fonts/FontAwesome.ttf',
        ],
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: process.env.EXPO_PROJECT_ID,
    },
  },
};
