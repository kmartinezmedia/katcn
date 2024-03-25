declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_URL: string;
      SOCKET_URL: string;
    }
  }
}

export {}