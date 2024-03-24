import { memo, useEffect, useRef } from 'react';

interface SocketProps {
  url: string;
  onConnect?: (socket: WebSocket) => void;
  onMessage?: (data: { css: string; js: string }) => void;
}

export const Socket = memo(function Socket({
  url,
  onConnect,
  onMessage,
}: SocketProps) {
  useEffect(() => {
    const websocket = new WebSocket(url);
    onConnect?.(websocket);
    websocket.onmessage = async (ev) => {
      const data = JSON.parse(ev.data);
      onMessage?.(data);
    };

    websocket.onclose = () => {
      websocket.close();
    };

    websocket.onerror = (error) => {
      throw error;
    };

    return () => {
      if (websocket.readyState === 1) {
        websocket.close();
      }
    };
  }, [url, onConnect, onMessage]);

  return null;
});
