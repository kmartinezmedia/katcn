declare module "bun" {
  interface Env {
    GIT_WEBHOOK_SECRET: string;
    HOME: string;
    PM2_APP_NAME: string;
    PORT: string;
  }
}