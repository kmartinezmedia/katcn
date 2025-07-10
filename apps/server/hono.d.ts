import type { Context } from 'hono';

declare module 'hono' {
  interface ContextVariableMap {
    rawBody: Uint8Array;
  }
}