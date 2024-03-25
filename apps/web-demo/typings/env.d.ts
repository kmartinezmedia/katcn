declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SOCKET_URL: string;
    }
  }
}

export {}