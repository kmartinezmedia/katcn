declare module 'bun' {
  interface Env {
    PWD: string;
    TURBO_INVOCATION_DIR: string;
    APP_BUNDLE_IDENTIFIER: string;
    APP_APPLE_BUNDLE_IDENTIFIER: string;
    APP_ANDROID_BUNDLE_IDENTIFIER: string;
    RCT_NO_LAUNCH_PACKAGER?: string;
    EXPO_NO_TELEMETRY?: string;
    EAS_LOCAL_BUILD_ARTIFACTS_DIR?: string;
    EAS_LOCAL_BUILD_SKIP_CLEANUP?: string;
    EXPO_PROFILE?: string;
    EXPO_USE_METRO_WORKSPACE_ROOT?: string;
    EXPO_BUNDLE_APP?: string;
  }
}
