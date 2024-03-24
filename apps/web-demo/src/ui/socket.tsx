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
    // window.socket = websocket;
    websocket.onopen = (ev) => {
      console.log('NextJS WebSocket Connected');
      console.log(ev);
    };

    websocket.onmessage = async (ev) => {
      console.log('NextJS WebSocket message');
      const data = JSON.parse(ev.data);
      console.log('data', data);
      onMessage?.(data);
    };

    websocket.onclose = () => {
      console.log('Nextjs WebSocket Disconnected');
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
