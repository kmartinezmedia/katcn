declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_SOCKET_URL: string;
    }
  }
}

export {}