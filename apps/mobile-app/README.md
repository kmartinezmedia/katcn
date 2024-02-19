# Mobile Playground

## Environment setup

1. Ensure eas CLI is installed globally

```bash
bun install -g eas-cli
```

2. Install fastlane and cocoapods needed to run build locally

```bash
brew install fastlane
```

```bash
brew install cocoapods
```

__Optional__

```bash
npm install -g sharp-cli
```

3. Add env vars

```bash
touch .env
```

```bash
EXPO_TOKEN=GRAB FROM EXPO ACCOUNT SETTINGS
EXPO_PROJECT_ID=GRAB FROM EXPO PROJECT
```

4. Run debug build of mobile app.

_You only have to build the debug app during initial setup or anytime you add or remove a native dependency_

```bash
bun run build:ios-debug
```

5. Start react native server for the debug build

```bash
bun run dev
```

## Getting started

1. `cd` into mobile-app workspace

```shell
cd apps/mobile-app
```

2. Build debug build to run locally in simulator

```shell
bun run build:ios-debug
```

3. Start dev server and launch built app

```shell
bun run dev
```

# OTA updates

For preview builds. This is just notes for testing

```shell
xcrun simctl openurl booted com.katmartinez.mobileappdebugsim://?url=https://u.expo.dev/3dd32a04-7100-4a47-9785-556d29477d5a
```

```shell
xcrun simctl openurl booted com.katmartinez.mobileappreleasesim://?url=https://u.expo.dev/3dd32a04-7100-4a47-9785-556d29477d5a?channel-name=preview?commit=72e46fe730f86771ba529290281632fc2ca323e9
```

```shell
xcrun simctl openurl booted com.katmartinez.mobileappreleasesim://expo-development-client/?url=https://u.expo.dev/3dd32a04-7100-4a47-9785-556d29477d5a
```

## Deep link to route

For debug build

```shell
bunx uri-scheme open com.katmartinez.mobileappdebugsim://route-name --ios
```

or

```shell
xcrun simctl openurl booted com.katmartinez.mobileappdebugsim://route-name
```

For release build

```shell
bunx uri-scheme open com.katmartinez.mobileapprelease://route-name --ios
```

or

```shell
xcrun simctl openurl booted com.katmartinez.mobileapprelease://route-name
```

TODO: Add sitemap route https://docs.expo.dev/router/reference/sitemap/

# TODOS

- look into `xcodebuild -sdk iphonesimulator`
- https://github.com/expo/custom-expo-updates-server/tree/main
- https://docs.expo.dev/eas-update/build-locally/
- https://docs.expo.dev/eas-update/debug-advanced/#inspecting-manifests-manually
- https://docs.expo.dev/guides/linking/#creating-urls
